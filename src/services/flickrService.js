import axios from "axios";

const FlickrPhotos = async () => {
  // itemData structure
  // itemData = [{ img: { small: "", large: "", original: "" }, title: "", tags: "" }];

  let itemData = [];

  const apiKey = import.meta.env.VITE_API_KEY;
  const userId = import.meta.env.VITE_USER_ID;

  const baseUrl = `https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

  const fetchPhotoSize = async (photoId) => {
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`
      );

      const sizes = response.data.sizes?.size || [];

      const getSize = (label) => sizes.find((s) => s.label === label)?.source || null;

      const small = getSize("Small");
      const large = getSize("Large");
      const original = getSize("Original");

      if (!small && !large && !original) {
        console.warn(`No valid sizes found for photo ID: ${photoId}`);
        return null;
      }

      return { small, large, original };
    } catch (error) {
      console.error(`Error fetching sizes for photo ID ${photoId}:`, error.message);
      return null;
    }
  };

  const fetchPhotoTag = async (photoId) => {
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`
      );
      const data = response.data.photo.tags.tag;
      const tags = data.map((item) => item.raw);

      return { tag: tags };
    } catch (error) {
      error.message;
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`${baseUrl}`);
      const photo = response.data.photos.photo;

      const promises = [];

      for (const pic of photo) {
        promises.push(
          Promise.all([fetchPhotoSize(pic.id), fetchPhotoTag(pic.id)]).then(([urlPics, tagPics]) => {
            const newPic = {
              img: { small: urlPics.small, large: urlPics.large, original: urlPics.original },
              title: pic.title,
              tag: tagPics.tag,
            };
            return newPic;
          })
        );
      }

      const results = await Promise.all(promises);
      itemData.push(...results);
    } catch (error) {
      console.error(error.message);
    }
  };

  await fetchPhotos();

  return { itemData };
};

const loadOne = async (url) => {
  await axios.get(url);
};

const FlickrAPI = { FlickrPhotos, loadOne };

export default FlickrAPI;
