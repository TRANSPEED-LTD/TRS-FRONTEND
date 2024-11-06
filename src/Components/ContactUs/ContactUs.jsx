import ContactFrom from "./ContactFrom";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <>
      <div className="bg-contact ">
        <div className=" d-flex justify-content-between align-items-start mx-auto px-2 pb-5 pt-65 max-w-1050">
          <div>
            <h2 className="font-48 mb-60">Contact us</h2>
            <p className="max-w-450 font-md f-light mb-112  lh-sm opacity-75">
              We&apos;re here on 24/7 to help whether you have a question or
              need an assistance.
            </p>
            <div className="font-md f-light d-flex align-items-center">
              <FaLocationDot className="me-3 icon-size" />
              329N 40th Street, PA, 19086
            </div>
            <div className="font-md f-light d-flex align-items-center mt-4">
              <MdEmail className="me-3 icon-size" />
              info@Shipify.com
            </div>
            <div className="font-md f-light d-flex align-items-center mt-4">
              <FaPhoneAlt className="me-3 icon-size" />
              +12587416953
            </div>
          </div>
          <hr
            className=" opacity-50"
            style={{
              height: "470px",
              border: "2px solid white",
              margin: "16px 0px 0px",
            }}
          />
          <ContactFrom />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
