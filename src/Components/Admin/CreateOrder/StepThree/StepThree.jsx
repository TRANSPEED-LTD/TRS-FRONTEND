import { useState, useEffect, useRef } from "react";
import StepSideBar from "../StepSideBar";
import { IoIosAddCircle } from "react-icons/io";
import Shipper from "./Shipper";
import Carrier from "./Carrier";
import axios from "axios";
import Cookies from "js-cookie";
import { TiDelete } from "react-icons/ti";
import PropTypes from "prop-types";

function StepThree({ onPrevious, onNext, setCompanies,  selectedShipper, setSelectedShipper, selectedCarrier, setSelectedCarrier  }) {
  const [addShipper, setAddShipper] = useState(false);
  const [addCarrier, setAddCarrier] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState(""); 
  const [results, setResults] = useState([]);
  const [token, setToken] = useState(null);

  const shipperInputRef = useRef(null);
  const carrierInputRef = useRef(null);
  const resultsRef = useRef(null);
  const nextvalid = () => {
    if (!selectedCarrier || !selectedShipper){
      return
    } 
    setCompanies({
      carrier_company_vat: selectedCarrier?.vat_number,
      shipper_company_vat: selectedShipper?.vat_number
    })
    onNext()
  }
  const AddShipperOpener = () => {
    setAddShipper(!addShipper);
  };

  const AddCarrierOpener = () => {
    setAddCarrier(!addCarrier);
  };
  const handleCarrierSuccess = (carrier) => {
    setSelectedCarrier(carrier);
    setAddCarrier(false);
  };
  const handleShipperSuccess = (Shipper) => {
    setSelectedShipper(Shipper);
    setAddShipper(false);
  };
  useEffect(() => {
    const savedToken = Cookies.get("token");
    setToken(savedToken);
  }, []);

  useEffect(() => {
    if (inputValue && inputType && token) {
      axios
        .get(
          `${import.meta.env.VITE_API_BASE_URL}/companies/get-companies?search_keyword=${inputValue}&company_type=${inputType}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error(`Error fetching ${inputType.toLowerCase()} data:`, error);
        });
    } else {
      setResults([]);
    }
  }, [inputValue, inputType, token]);

  const handleShipperInputChange = (e) => {
    setInputValue(e.target.value);
    setInputType("SHIPPER");
  };

  const handleCarrierInputChange = (e) => {
    setInputValue(e.target.value);
    setInputType("CARRIER");
  };

  const handleShipperSelect = (shipper) => {
    setSelectedShipper(shipper);
    setResults([]);
  };

  const handleCarrierSelect = (carrier) => {
    setSelectedCarrier(carrier);
    setResults([]);
  };

  const handleShipperDelete = () => {
    setSelectedShipper(null);
  };

  const handleCarrierDelete = () => {
    setSelectedCarrier(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shipperInputRef.current &&
        !shipperInputRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setResults([]);
      }

      if (
        carrierInputRef.current &&
        !carrierInputRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="d-flex flex-row justify-items-between justify-content-evenly f-light text">
        <StepSideBar currentStep={3} />
        <div className="d-flex flex-column w-75">
          <div className="d-flex flex-column align-items-start ms-4 mb-5 position-relative">
            <h1 className="font-23 darkblue f-medium mt-3 mb-60">
              Shipper information
            </h1>
            {selectedShipper ? (
               <div className="font-md darkblue mt-5 w-100 input-border f-medium darkblue rounded-1 py-2 d-flex flex-row align-items-center justify-content-center">
               <TiDelete className="opacity-0 icon-36 me-auto ms-2"/>{selectedShipper.name} <TiDelete onClick={handleShipperDelete} className="icon-36 ms-auto me-2 pointer text-danger opacity-75 z-1"/>
             </div>
            ) : (
              <>
              <input
              type="text"
              className="h-40 form-input border-2 form-control"
              onChange={handleShipperInputChange}
              placeholder="Search for shipper"
              ref={shipperInputRef}
            />
            {inputType === "SHIPPER" && results.length > 0 && (
              <ul className="w-100 list-border position-absolute top-140 z-3 dropCompanies overflow-y-auto" ref={resultsRef}>
                {results.map((shipper, index) => (
                  <li
                    key={index}
                    className="darkblue font-md w-100 text-start list-button pointer"
                    onClick={() => handleShipperSelect(shipper)}
                  >
                    {shipper.name}
                    <p className="mt-1 opacity-75 font-12">
                      VAT number: {shipper.vat_number}
                    </p>
                  </li>
                ))}
              </ul>
            )}
                <p className="my-3 darkblue font-23 f-medium align-self-center">
                  OR
                </p>
                <button
                  className="btn bg-shadeblue w-100 text-white font-small rounded-1 py-2 d-flex flex-row align-items-center justify-content-center"
                  onClick={AddShipperOpener}
                >
                  <IoIosAddCircle className="me-2 icon-size" />
                  Add new
                </button>
              </>
            )}

            <div
              className={`px-3 w-100 bg-white ${addShipper ? "" : "d-none"}`}
            >
              <Shipper success={handleShipperSuccess}/>
            </div>
          </div>
          <hr
            className="my-0 ms-3"
            style={{
              height: "1px",
              color: "rgba(36, 48, 63, 0.20)",
              width: "85%",
              alignSelf: "center",
            }}
          />
          <div className="d-flex flex-column align-items-start ms-4 mt-5 mb-112 position-relative">
            <h1 className="font-23 darkblue f-medium mt-3 mb-60">
              Carrier information
            </h1>
            {selectedCarrier ? (
              <>
                <div className="font-md darkblue mt-5 w-100 input-border f-medium darkblue rounded-1 py-2 d-flex flex-row align-items-center justify-content-center">
                  <TiDelete className="opacity-0 icon-36 me-auto ms-2"/>{selectedCarrier.name} <TiDelete onClick={handleCarrierDelete} className="icon-36 ms-auto me-2 text-danger pointer opacity-75 z-1"/>
                </div>
                </>
            ) : (
              <>
               <input
              type="text"
              className="h-40 form-input border-2 form-control"
              onChange={handleCarrierInputChange}
              placeholder="Search for carrier"
              ref={carrierInputRef}
            />
            {inputType === "CARRIER" && results.length > 0 && (
              <ul className="w-100 list-border position-absolute top-140 z-3 dropCompanies overflow-y-auto" ref={resultsRef}>
                {results.map((carrier, index) => (
                  <li
                    key={index}
                    className="darkblue font-md w-100 text-start list-button pointer"
                    onClick={() => handleCarrierSelect(carrier)}
                  >
                    {carrier.name}
                    <p className="mt-1 opacity-75 font-12">
                      VAT number: {carrier.vat_number}
                    </p>
                  </li>
                ))}
              </ul>
            )}
                <p className="my-3 darkblue font-23 f-medium align-self-center">
                  OR
                </p>
                <button
                  className="btn bg-shadeblue w-100 text-white font-small rounded-1 py-2 d-flex flex-row align-items-center justify-content-center"
                  onClick={AddCarrierOpener}
                >
                  <IoIosAddCircle className="me-2 icon-size" />
                  Add new
                </button>
              </>
            )}

            <div
              className={`px-3 w-100 bg-white ${addCarrier ? "" : "d-none"}`}
            >
              <Carrier onSuccess={handleCarrierSuccess} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border w-100 mt-auto">
        <div className="d-flex flex-row gap-2 f-normal pt-4 pb-5 justify-content-center">
          <button
            className="btn bg-white text-black font-small rounded-1 py-2 input-border w-300"
            onClick={onPrevious}
          >
            Back
          </button>
          <button
            className="btn bg-shadeblue text-white font-small rounded-1 py-2 w-300"
            onClick={nextvalid}
          >
            Go next
          </button>
        </div>
      </div>
    </>
  );
}

StepThree.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  setCompanies: PropTypes.func,
  selectedShipper: PropTypes.object,
  setSelectedShipper: PropTypes.func, 
  selectedCarrier: PropTypes.object, 
  setSelectedCarrier: PropTypes.func, 
};

export default StepThree;
