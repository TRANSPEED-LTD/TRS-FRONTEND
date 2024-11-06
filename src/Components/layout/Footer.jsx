import logo from "../../assets/images/Shipify-logo.png";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-main" style={{ borderTop: "2px black solid" }}>
        <div
          className=" mx-auto pt-5 px-2 max-w-1050" 
        >
          <div className="d-flex justify-content-between align-items-start pb-4">
            <div className="d-flex flex-column align-items-start">
              <div className=" d-flex flex-row align-items-center">
                <Link to="/">
                  <img src={logo} alt="logo" className="w-auto " height={74} />
                </Link>
                <Link to="/">
                <h2 className=" f-bold h2 ms-1 mb-0">Shipify</h2>
                </Link>
              </div>
              <div>
                {" "}
                <ul className="f-light font-md mt-38">
                  <li className="">329N 40th Street, PA, 19086</li>
                  <li className="mt-3">+12587416953</li>
                  <li className="mt-3">info@Shipify.com</li>
                </ul>
              </div>
            </div>

            <div>
              <ul className="f-light font-md">
                <li className="mt-2">
                  <Link to="/">Home</Link>
                </li>
                <li className="mt-3">
                  <Link to="#" onClick={(e) => e.preventDefault()}>
                    Products
                  </Link>
                </li>
                <li className="mt-3">
                  <Link to="#" onClick={(e) => e.preventDefault()}>
                    About us
                  </Link>
                </li>
                <li className="mt-3">
                  <Link to="#" onClick={(e) => e.preventDefault()}>
                    FAQ
                  </Link>
                </li>
                <li className="mt-3">
                  <Link to="#" onClick={(e) => e.preventDefault()}>
                    Contact us
                  </Link>
                </li>
                <li className="mt-3">
                  <Link to="#" onClick={(e) => e.preventDefault()}>
                    Terms & conditions
                  </Link>
                </li>
                <li className="mt-3">
                  <Link to="#" onClick={(e) => e.preventDefault()}>
                    Privacy policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="h4 mb-4 mt-2">
                Sign Up for Freight Market Updates
              </div>
              <div className="flex-row d-flex pr-md-5">
                <input
                  type="email"
                  className="bg-transparent text-white font-md f-light input-subscribe"
                  placeholder="Enter your email *"
                />

                <div
                  className="rounded bg-shadeblue px-4 f-bold font-15 text-white align-content-center"
                  style={{ cursor: "pointer" }}
                >
                  Subscribe
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr
          style={{ border: "0.5px solid white" }}
          className="m-0 opacity-100"
        />

        <div
          className=" text-white mx-auto py-4 max-w-1050"
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="font-md f-light d-flex flex-row align-items-center">
              <span className="me-2 h4 mb-0"> &copy; </span> 2024 Shipify Inc.
            </div>

            <div className="d-flex flex-row gap-5">
              <FaLinkedin  className="icon-size"/>
              <FaSquareFacebook  className="icon-size"/>
              <FaSquareXTwitter  className="icon-size"/>
              <FaSquareWhatsapp  className="icon-size"/>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer
