import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import StepSideBar from "../StepSideBar";
import Tent from "./Tent";
import FlatBed from "./Flat";
import Reefer from "./Reefer";
import img from "images/cargo-trailer.png";
import "./steps.scss"

const StepTwo = ({ onPrevious, onNext, setselected,setSelectedItem,selectedItem, tentdata, settentdata,flatdata,setflatdata,reeferdata,setreeferdata}) => {
  const [auth, setAuth] = useState(false);
  const [isNext, setIsNext] = useState(false);
  
  useEffect(() => {
    if (isNext) {
      setselected(selectedItem === 'Tent' ? tentdata : selectedItem === 'Flat Bed' ? flatdata : reeferdata)
      onNext();
    }
  }, [isNext, onNext]);

  const options = [
    { name: "Tent", component: <Tent setFormData={settentdata} formData={tentdata} setIsNext={setIsNext} setAuth={setAuth} auth={auth}/> },
    { name: "Flat Bed", component: <FlatBed setFormData={setflatdata} formData={flatdata} setIsNext={setIsNext} setAuth={setAuth} auth={auth} /> },
    { name: "Reefer", component: <Reefer setFormData={setreeferdata} formData={reeferdata} setIsNext={setIsNext} setAuth={setAuth} auth={auth} /> },
  ];

  const selectedContent = options.find((item) => item.name === selectedItem)?.component || null;
  return (
    <>
      <div className="d-flex flex-row justify-items-between justify-content-evenly f-light text">
        <StepSideBar currentStep={2} />
        <div className="d-flex flex-column align-items-start ms-4">
          <h1 className="font-23 darkblue f-medium mt-3 mb-4">Specify your cargo</h1>
          <p className="darkblue mb-1">Transport type *</p>
          <div className="d-flex flex-row align-items-center gap-3">
            {options.map(({ name }) => (
              <div
                key={name}
                className={`h-130 w-255 input-border form-control bg-form d-flex flex-column align-items-center pointer ${selectedItem === name ? "bg-lightblue-active" : ""}`}
                onClick={() => setSelectedItem(name)}
              >
                <img src={img} alt={name} className="icon-80" />
                <p className="f-bold font-12 darkblue mt-2">{name}</p>
              </div>
            ))}
          </div>
          {selectedContent}
        </div>
      </div>
      <div className="bg-white border w-100 mt-auto">
        <div className="d-flex flex-row gap-2 f-normal pt-4 pb-5 justify-content-center">
          <button className="btn bg-white text-black font-small rounded-1 py-2 input-border w-300" onClick={onPrevious}>
            Back
          </button>
          <button className="btn bg-shadeblue text-white font-small rounded-1 py-2 w-300" onClick={() => setAuth(!auth)}>
            Go next
          </button>
        </div>
      </div>
    </>
  );
};

StepTwo.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  setselected: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  selectedItem: PropTypes.string.isRequired,
  tentdata: PropTypes.object.isRequired,
  settentdata: PropTypes.func.isRequired,
  flatdata: PropTypes.object.isRequired,
  setflatdata: PropTypes.func.isRequired,
  reeferdata: PropTypes.object.isRequired,
  setreeferdata: PropTypes.func.isRequired,
};

export default StepTwo;
