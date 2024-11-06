import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import emailimg from "images/sentemail.png";

const Modal = ({ showModal, handleClose, email }) => {
  const [disabled, setDisabled] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  const sendMessage = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
      setTimerStarted(false);
    }, 120000);
  };

  useEffect(() => {
    if (showModal && !timerStarted) {
      sendMessage();
      setTimerStarted(true);
    }
  }, [showModal, timerStarted, email]);

  return (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      tabIndex="-1"
    >
      <div className="modal-dialog-centered modal-dialog-scrollable max-w-700 mx-auto">
        <div className="modal-content p-2" style={{ height: "427px" }}>
          <button
            type="button"
            className="btn-close ms-auto p-2"
            style={{
              backgroundColor: "rgba(250, 89, 90, 0.70)",
              borderRadius: "999px",
              opacity: "1",
            }}
            onClick={handleClose}
          ></button>
          <div className="text-black d-flex flex-column align-items-center text-center">
            <img
              src={emailimg}
              alt="email icon"
              width={164}
              height={164}
              className="mb-3"
            />
            <p className="f-light font-30 mb-2">Verify your email</p>
            <p
              className="opacity-75"
              style={{ maxWidth: "245px", fontSize: "12px" }}
            >
              We have sent the email to {email} to confirm the validity of your
              email address.
            </p>
            <p
              className="opacity-75 mt-1"
              style={{ maxWidth: "245px", fontSize: "12px" }}
            >
              After receiving the email, follow the link provided to complete
              your registration.
            </p>
          </div>
          <div
            className="d-flex flex-row gap-2 f-normal "
            style={{ margin: "40px auto 0px", width: "245px" }}
          >
            <button
              className="btn bg-shadeblue text-white font-small rounded-1 w-100"
              onClick={handleClose}
            >
              Got it
            </button>
            <button
              className="btn text-black font-small rounded-1 input-border w-100 "
              disabled={disabled}
              style={{
                opacity: disabled ? "0.5" : "1",
                cursor: disabled ? "not-allowed" : "pointer",
                backgroundColor: disabled ? "grey" : "white",
                pointerEvents: "auto",
              }}
              onClick={sendMessage}
            >
              Send again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  email: PropTypes.string,
};

export default Modal;
