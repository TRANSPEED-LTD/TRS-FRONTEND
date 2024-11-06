import password from "images/password.png";
import email from "images/email.png";
import PropTypes from "prop-types";
import { useState } from "react";
const Reset = ({ showModal, handleClose }) => {
  const [send, setsend] = useState(false);

  const SentLink = async (event) => {
    event.preventDefault();
    setsend(true);

    setTimeout(() => {
      handleClose();
      setsend(false);
    }, 3000);
  };
  return (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      tabIndex="-1"
    >
      <div className="modal-dialog-centered modal-dialog-scrollable max-w-700 mx-auto">
        <div className="modal-content p-2" style={{ height: "427px" }}>
          <button
            type="button"
            className="btn-close ms-auto p-2 "
            style={{
              backgroundColor: "rgba(250, 89, 90, 0.70)",
              borderRadius: "999px",
              opacity: "1",
            }}
            onClick={handleClose}
          ></button>

          <div className="text-black d-flex flex-column align-items-center text-center">
            {!send ? (
              <>
                <img
                  src={password}
                  alt="password icon"
                  width={164}
                  height={164}
                />
                <p className="f-light font-30 mb-1">Password recovery</p>
                <p
                  className="opacity-75"
                  style={{ maxWidth: "240px", fontSize: "12px" }}
                >
                  Enter your email and we will send you a link to reset your
                  password
                </p>
                <form
                  className="mt-38 font-md f-light d-flex flex-column w-350"
                  onSubmit={(event) => SentLink(event)}
                >
                  <div className="d-flex flex-column mb-2">
                    <label
                      htmlFor="email"
                      className=" opacity-75 mb-1 font-15 text-start"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="input-border form-control h-40 bg-form "
                      id="emails"
                      name="email"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn bg-shadeblue text-white font-small rounded-1 pd-1"
                  >
                    Send link to email
                  </button>
                </form>
              </>
            ) : (
              <>
                <img src={email} alt="email icon" width={164} height={164} className="my-4"/>
                <p className="f-light font-30 mb-1">Email sent</p>
                <p
                  className="opacity-75"
                  style={{ maxWidth: "240px", fontSize: "12px" }}
                >
                  Please check your email and open the link we sent to continue
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Reset.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Reset;
