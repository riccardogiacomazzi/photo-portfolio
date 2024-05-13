import axios from "axios";

const FlickrPhotos = async () => {
  // itemData structure
  // itemData = [{ img: { small: "", large: "", original: "" }, title: "", tags: "" }];

  let itemData = [];

  const apiKey = "497d7a1007b84844ce5da67556b24e39";
  const userId = "187209277@N04";
  const baseUrl = `https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

  const fetchPhotoSize = async (photoId) => {
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`
      );
      const originalSize = response.data.sizes.size.find((size) => size.label === "Original");
      const largeSize = response.data.sizes.size.find((size) => size.label === "Large");
      const smallSize = response.data.sizes.size.find((size) => size.label === "Small");
      console.log(largeSize);

      return { small: smallSize.source, large: largeSize.source, original: originalSize.source };
    } catch (error) {
      console.log(error.message);
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
      console.log(error.message);
    }
  };

  await fetchPhotos();

  return { itemData };
};

const FlickrAPI = { FlickrPhotos };

export default FlickrAPI;
