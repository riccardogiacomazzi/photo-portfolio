import "./Contact.css";
import { useState } from "react";
import { Box, TextField, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { init, send } from "emailjs-com";

const Contact = ({ infoText, size, bgImage }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSucces, setFormSucces] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  //initialize emailJS service
  init(import.meta.env.VITE_EMAILJS_INIT);

  const handleFormSubmit = async () => {
    try {
      await send(import.meta.env.VITE_EMAILJS_SERVICE_KEY, import.meta.env.VITE_EMAILJS_TEMPLATE_KEY, {
        from_name: email,
        message: message,
      });
      setFormSucces(true);
      setTimeout(() => {
        setFormSucces(false);
      }, 3000);
      setEmail("");
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-flex" sx={{ flexDirection: "row" }}>
      <div className="contact-main-flex">
        {size.width > 700 && <img className="info-image" src={bgImage.img.original} />}
        <div className="info-form-container">
          {/* INFO TEXT */}
          <div className="info-box">
            <Accordion>
              <AccordionSummary sx={{ fontSize: "24px" }} expandIcon={<ArrowDropDownIcon />}>
                Info
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{ fontFamily: "Raleway" }}
                  component="div"
                  dangerouslySetInnerHTML={{ __html: infoText.generalInfo }}
                ></Typography>
              </AccordionDetails>
            </Accordion>
            {/* {website information} */}
            <Accordion>
              <AccordionSummary sx={{ fontSize: "24px" }} expandIcon={<ArrowDropDownIcon />}>
                Website Development
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{ fontFamily: "Raleway" }}
                  component="div"
                  dangerouslySetInnerHTML={{ __html: infoText.webDev }}
                ></Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
