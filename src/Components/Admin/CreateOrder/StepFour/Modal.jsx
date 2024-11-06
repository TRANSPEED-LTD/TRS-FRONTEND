import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import icon from "images/icon.png";
import PropTypes from 'prop-types';

const Modal = ({ olddata, setStepFourImage, StepFourImage}) => {
  const [showModal, setShowModal] = useState(true);
  const [fieldValidity, setFieldValidity] = useState({ file: true });
  const [newdata, setnewdata] = useState(olddata);
  const handleCloseModal = async () => {
    if (StepFourImage.file) {
      const updatedData = {
        ...newdata,
        files: Array.isArray(newdata.files) ? [...newdata.files, StepFourImage.file] : [StepFourImage.file]
      };
      setnewdata(updatedData);
      try {
        const token = Cookies.get('token'); 
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/documents/create-order`, updatedData, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200){
          setShowModal(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setFieldValidity({ file: false });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setStepFourImage({ file });
    setFieldValidity({ file: !!file });
  };

  return (
    <div className={`modal fade ${showModal ? "show d-block bg-modal" : ""}`} tabIndex="-1">
      <div className="modal-dialog-centered modal-dialog-scrollable max-w-700 mx-auto">
        <div className="modal-content px-5">
          <div className="text-black d-flex flex-column align-items-center text-center">
            <p className="f-light font-30 mb-1 mt-5">We’re almost done!</p>
            <p className="opacity-75 mt-2 mb-4 lh-sm font-12">
              Please upload the company logo and signature to apply them to the shipment invoice. You may edit them in the future in the company info under the account tab.
            </p>
            <div className="row h-240 m-0 mt-2 position-relative w-fill">
              <div
                className={`create-img file d-flex flex-column align-items-center pointer ${
                  StepFourImage.file ? "uploaded" : ""
                } ${!fieldValidity.file ? " bg-error" : ""}`}
              >
                <input
                  className="file pointer"
                  type="file"
                  onChange={handleFileChange}
                />
                <div>
                  <img src={icon} alt="" className="icon-32 mt-5 mb-3" />
                </div>
                <div className="d-flex flex-column align-items-center">
                  {!StepFourImage.file ? (
                    <>
                      <p className="font-15 darkblue mb-1">
                        Drag & drop or Choose a file to upload
                      </p>
                      <p className="font-12 opacity-50">
                        DOCX, XLSX, PDF, JPG, and PNG formats up to 50 MB
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="font-md f-bold">
                    {StepFourImage.file ? StepFourImage.file.name : ""}
                  </div>
                </div>
                <div className="f-bold mt-4">
                  <div className="browse">
                    <button>Upload company logo</button>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={handleCloseModal} className="w-300 btn bg-shadeblue text-white my-4">
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  olddata: PropTypes.object,
  setStepFourImage: PropTypes.func.isRequired,
  StepFourImage: PropTypes.object.isRequired
};

export default Modal;
