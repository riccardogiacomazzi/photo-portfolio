import "./Contact.css";
import { Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Contact = ({ infoText, size, bgImage }) => {
  return (
    <div className="main-flex" sx={{ flexDirection: "row" }}>
      <div className="contact-main-flex">
        <div className="wrapper">
          {size.width > 700 && bgImage && <img className="info-image" src={bgImage.img.original} />}
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
    </div>
  );
};

export default Contact;
