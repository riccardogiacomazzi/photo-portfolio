import { useState } from "react";
import { Box, TextField, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
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
    <Box className="main-flex" sx={{ flexDirection: "row" }}>
      <Box className="contact-main-flex">
        <Box sx={{ maxWidth: "50%", display: "flex" }}>
          {size.width > 700 && <img className="info-image" src={bgImage.img.original} />}
        </Box>
        <Box className="info-form-container">
          {/* INFO TEXT */}
          <Box className="info-box" sx={{ height: "300px" }}>
            <Accordion>
              <AccordionSummary sx={{ overflow: "auto" }}>
                <Typography variant="h5">My View on Photography</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="div" dangerouslySetInnerHTML={{ __html: infoText.generalInfo }}></Typography>
              </AccordionDetails>
            </Accordion>
            {/* {infoText} */}
            <Accordion>
              <AccordionSummary>
                <Typography variant="h5">Website Information and Development Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="div" dangerouslySetInnerHTML={{ __html: infoText.webDev }}></Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* CONTACT FORM */}
          <Box className="contact-form">
            <Typography align="center" variant="h5">
              Contact Me
            </Typography>
            <TextField
              className="text-input"
              sx={{ marginBottom: "10px", marginTop: "10px" }}
              label="Your Email"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              className="text-input"
              label="Message"
              multiline
              rows={4}
              value={message}
              onChange={handleMessageChange}
            />
            <Button
              onClick={handleFormSubmit}
              disabled={email.length === 0 || message.length === 0}
              // color={formSucces === true ? "success" : "default"}
              sx={{ marginTop: "10px" }}
            >
              {formSucces === false ? "Submit" : "Message Sent"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
