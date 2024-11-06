import Modal from "./Modal";
import { FiCheckSquare } from "react-icons/fi";
import PropTypes from 'prop-types';
import img from "images/cargo-trailer.png";
import {
  TentLoadingType,
  TentContainer,
  FlatBedContainer,
  ReeferContainer,
  Cargo,
  CargoCategory
} from "../StepTwo/data";

const StepFour = ({data, onPrevious, setStepFourImage, StepFourImage, carrierName, shipperName}) => {
  const getContainerType = (type) => {
    return TentContainer[type] || FlatBedContainer[type] || ReeferContainer[type] || type;
  };
  return (
    <>
    <div className="d-flex flex-row mt-auto">
      <div className="d-flex flex-column align-items-start mx-70 mt-auto left-panel">
        <FiCheckSquare style={{width:"70px", height:"70px", stroke:"#24303F"}}/>
        <div className="d-flex flex-column w-350">
        <p className="darkblue font-30 lh-sm mt-4 mb-3">Order is almost here! Review and confirm.</p>
        <p className="font-small darkblue opacity-50 mb-112">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        </div>
        <div className="d-flex flex-row gap-2 f-normal pt-4 mb-60 justify-content-center">
        <button
            className="btn bg-shadeblue text-white font-small rounded-1 py-2 w-164"
          >
            Review & confirm
          </button>
          <button
            className="btn bg-white text-black font-small rounded-1 py-2 input-border w-164"
            onClick={onPrevious}
          >
            Back
          </button>
          
        </div>
      </div>
      <div className="right-panel w-100">
        <div className="ps-5">
        <div className="d-flex flex-column mt-3 mb-4">
            <div className="font-12 darkblue opacity-50 mb-2">Transport type</div>
              <div
                className="h-70 w-130 d-flex flex-column align-items-center cargo">
                <img src={img} alt="cargo-trailer" className="icon-40" />
                <div className="font-12 darkblue opacity-50 mb-1">{data.transportation_type}</div>
          </div>
          </div>
          <div className="grid-container">
    <div >
      <div className="font-12 darkblue opacity-50">Cargo name</div>
      <div className="font-15 darkblue mt-2 text-break">{data.cargo_name}</div>
    </div>

    <div >
      <div className="font-12 darkblue opacity-50">Weight(kg)</div>
      <div className="font-15 darkblue mt-2 text-break">{data.weight}</div>
    </div>

    <div >
      <div className="font-12 darkblue opacity-50">container type</div>
      <div className="font-15 darkblue mt-2 text-break">{getContainerType(data.container_type)}</div>
    </div>

    <div >
      <div className="font-12 darkblue opacity-50">Cargo type</div>
      <div className="font-15 darkblue mt-2 text-break">{Cargo[data.cargo_type]}</div>
    </div>
{data.loading_type ?
    <div >
      <div className="font-12 darkblue opacity-50">Loading type</div>
      <div className="font-15 darkblue mt-2 text-break">{TentLoadingType[data.loading_type]}</div>
    </div> : null }
    {data.dimension ?
    <div >
      <div className="font-12 darkblue opacity-50">Dimensions (m)</div>
      <div className="font-15 darkblue mt-2 text-break">{data.dimension.replace(/,/g, " x")}</div>
      </div> : null }

    <div >
      <div className="font-12 darkblue opacity-50">Cargo category</div>
      <div className="font-15 darkblue mt-2 text-break">{CargoCategory[data.cargo_category]}</div>
    </div>

    <div >
      <div className="font-12 darkblue opacity-50">Cargo price ($)</div>
      <div className="font-15 darkblue mt-2 text-break">{data.price}</div>
    </div>

    <div >
      <div className="font-12 darkblue opacity-50">Insurance</div>
      <div className="font-15 darkblue mt-2 text-break">{data.insurance ? <>Yes <span className="checkmark">✔</span></> : <>No</>}</div>
    </div>
  </div>
    <hr style={{height: "1px", width: "65%", color: "rgb(36 48 63)",opacity: "0.50", margin: "32px auto 32px 30px"}}/>
          <div className="d-flex flex-row column-gap-60 flex-wrap row-gap-4 mb-5">
          <div className="d-flex flex-column w-101">
            <div className="font-12 darkblue opacity-50">Shipper company</div>
            <div className="font-15 shadeblue mt-2 text-decoration-underline pointer">{shipperName}</div>
          </div>
          <div className="d-flex flex-column w-101">
            <div className="font-12 darkblue opacity-50">Carrier company</div>
            <div className="font-15 shadeblue mt-2 text-decoration-underline pointer">{carrierName}</div>
          </div>
          </div>
          {data.comments ? 
          <div className="d-flex flex-column">
          <div className="font-12 darkblue opacity-50">Comments</div>
          <div className="font-12 darkblue mt-2 wd-75 lh-sm mb-4">{data.comments}</div>
          </div> : null}
        </div>
        
      </div>
    </div>
      <Modal olddata={data} setStepFourImage={setStepFourImage} StepFourImage={StepFourImage}/>
    </>
  );
};

StepFour.propTypes = {
  data: PropTypes.object,
  carrierName: PropTypes.string,
  shipperName: PropTypes.string,
  onPrevious: PropTypes.func,
  setStepFourImage: PropTypes.func.isRequired,
  StepFourImage: PropTypes.object.isRequired
};

export default StepFour;
