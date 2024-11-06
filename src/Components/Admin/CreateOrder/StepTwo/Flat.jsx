import { useState, useRef, useEffect } from "react";
import icon from "images/icon.png";
import { FlatBedContainer, Cargo, CargoCategory } from "./data";
import PropTypes from 'prop-types';
import { IoIosArrowDown } from "react-icons/io";

const Flat = ({ setFormData, formData, setAuth, setIsNext, auth }) => {
  const [isfirst, setfirst] = useState(true);
  useEffect(() => {
    setFormData(formData);
  }, [setFormData]);
  const [dimension, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
  });

  const [dropdownState, setDropdownState] = useState({
    containerType: false,
    cargoCategory: false,
    cargoType: false,
  });

  const [searchTerms, setSearchTerms] = useState({
    containerType: "",
    cargoCategory: "",
    cargoType: "",
  });

  const [fieldValidity, setFieldValidity] = useState({
    containerType: true,
    cargoName: true,
    cargoCategory: true,
    cargoType: true,
    weight: true,
    file: true,
    price: true,
    insurance: true,
  });

  const dropdownRefs = {
    containerType: useRef(null),
    cargoCategory: useRef(null),
    cargoType: useRef(null),
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      file,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setFormData({
      ...formData,
      insurance: name === "yes",
    });
  };

  const handleDropdownToggle = (key) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleSearchInputChange = (key, value) => {
    setSearchTerms((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleOptionClick = (key, option) => {
    let newFormData = {
      ...formData,
      [key]: option,
    };
    if (key === "containerType") {
      newFormData.ncontainerType = Object.keys(FlatBedContainer).find(
        (k) => FlatBedContainer[k] === option
      );
    } if (key === "cargoCategory") {
      newFormData.ncargoCategory = Object.keys(CargoCategory).find(
        (k) => CargoCategory[k] === option
      );
    } if (key === "cargoType") {
      newFormData.ncargoType = Object.keys(Cargo).find(
        (k) => Cargo[k] === option
      );
    }
    setFormData(newFormData);

    setDropdownState((prevState) => ({
      ...prevState,
      [key]: false,
    }));
    setSearchTerms((prevState) => ({
      ...prevState,
      [key]: "",
    }));
  };

  const dataSources = {
    containerType: FlatBedContainer,
    cargoCategory: CargoCategory,
    cargoType: Cargo,
  };

  const filteredOptions = (key) => {
    const options = Object.values(dataSources[key] || {});
    return options.filter((option) =>
      option.toLowerCase().includes(searchTerms[key].toLowerCase())
    );
  };

  const handleDimensionChange = (event) => {
    const { name, value } = event.target;
    const newDimensions = {
      ...dimension,
      [name]: value,
    };
    
    setDimensions(newDimensions);
    const dimensionsString = `${newDimensions.length || 0}, ${newDimensions.width || 0}, ${newDimensions.height || 0}`;
    setFormData((prevState) => ({
      ...prevState,
      dimension: dimensionsString,
    }));
  };

  const handleClickOutside = (event) => {
    Object.keys(dropdownRefs).forEach((key) => {
      if (
        dropdownRefs[key].current &&
        !dropdownRefs[key].current.contains(event.target)
      ) {
        setDropdownState((prevState) => ({
          ...prevState,
          [key]: false,
        }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCurrencyChange = (event) => {
    const currency = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      currency,
    }));
  };

  const handlePriceChange = (event) => {
    const price = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      price,
    }));
  };
  useEffect(() => {
    if (isfirst) {
      setfirst(false);
      return;
    }
    handleSubmit();
  }, [auth]);

  const handleSubmit = () => {

    const requiredFields = [
      "containerType",
      "cargoName",
      "cargoCategory",
      "cargoType",
      "weight",
      "price",
      "file",
    ];
    const newFieldValidity = {};

    requiredFields.forEach((field) => {
      newFieldValidity[field] = formData[field] !== "";
    });

    setFieldValidity(newFieldValidity);

    const allValid = Object.values(newFieldValidity).every(Boolean);

    if (allValid) {
      setAuth(true);
      setIsNext(true);
    } else {
      setAuth(false);
      setIsNext(false);
    }
  };

  return (
    <div className="mt-4 darkblue w-100">
      <form onSubmit={handleSubmit} className="max-w-700">
        <div className="d-flex flex-row w-50 flex-nowrap row">
          <div className="mb-3">
            <label
              htmlFor="containerType"
              className={`mb-1 font-15 ${
                !fieldValidity.containerType ? "text-danger" : ""
              }`}
            >
              Type *
            </label>
            <div className="dropdown item-container" ref={dropdownRefs.containerType}>
              <input
                type="text"
                className={`input-border form-control h-40 bg-form pointer pe-4 ${
                  !fieldValidity.containerType ? "border-danger" : ""
                }`}
                id="containerType"
                name="containerType"
                readOnly
                value={formData.containerType}
                onClick={() => handleDropdownToggle("containerType")}
              />
              <IoIosArrowDown className="input-arrow" onClick={() => handleDropdownToggle("containerType")}/>
              <ul
                className={`dropdown-menu w-100 p-0 -mt-5 input-border ${
                  dropdownState.containerType ? "show" : ""
                }`}
              >
                <li>
                  <input
                    type="search"
                    className="form-control input search-input"
                    placeholder="&#128269; Search..."
                    value={searchTerms.containerType}
                    onChange={(e) =>
                      handleSearchInputChange("containerType", e.target.value)
                    }
                  />
                </li>
                {filteredOptions("containerType").map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      className="btn w-100 text-start font-15"
                      onClick={() => handleOptionClick("containerType", option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="cargoName"
              className={`mb-1 font-15 ${
                !fieldValidity.cargoName ? "text-danger" : ""
              }`}
            >
              Cargo name *
            </label>
            <input
              type="text"
              id="cargoName"
              className={`input-border form-control h-40 bg-form ${
                !fieldValidity.cargoName ? "border-danger" : ""
              }`}
              name="cargoName"
              value={formData.cargoName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="d-flex flex-row w-50 flex-nowrap row">
          <div className="mb-3">
            <label
              htmlFor="cargoType"
              className={`mb-1 font-15 ${
                !fieldValidity.cargoType ? "text-danger" : ""
              }`}
            >
              Cargo type *
            </label>
            <div className="dropdown item-container" ref={dropdownRefs.cargoType}>
              <input
                type="text"
                className={`input-border form-control h-40 bg-form pointer pe-4 ${
                  !fieldValidity.cargoType ? "border-danger" : ""
                }`}
                id="cargoType"
                name="cargoType"
                value={formData.cargoType}
                readOnly
                onClick={() => handleDropdownToggle("cargoType")}
              />
               <IoIosArrowDown className="input-arrow" onClick={() => handleDropdownToggle("cargoType")}/>
              <ul
                className={`dropdown-menu w-100 p-0 -mt-5 input-border ${
                  dropdownState.cargoType ? "show" : ""
                }`}
              >
                <li>
                  <input
                    type="search"
                    className="form-control input search-input"
                    placeholder="&#128269; Search..."
                    value={searchTerms.cargoType}
                    onChange={(e) =>
                      handleSearchInputChange("cargoType", e.target.value)
                    }
                  />
                </li>
                {filteredOptions("cargoType").map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      className="btn w-100 text-start font-15"
                      onClick={() => handleOptionClick("cargoType", option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="cargoCategory"
              className={`mb-1 font-15 ${
                !fieldValidity.cargoCategory ? "text-danger" : ""
              }`}
            >
              Cargo category *
            </label>
            <div className="dropdown item-container" ref={dropdownRefs.cargoCategory}>
              <input
                type="text"
                className={`input-border form-control h-40 bg-form pointer pe-4 ${
                  !fieldValidity.cargoCategory ? "border-danger" : ""
                }`}
                id="cargoCategory"
                name="cargoCategory"
                value={formData.cargoCategory}
                readOnly
                onClick={() => handleDropdownToggle("cargoCategory")}
              />
              <IoIosArrowDown className="input-arrow" onClick={() => handleDropdownToggle("cargoCategory")}/>

              <ul
                className={`dropdown-menu w-100 p-0 -mt-5 input-border ${
                  dropdownState.cargoCategory ? "show" : ""
                }`}
              >
                <li>
                  <input
                    type="search"
                    className="form-control input search-input"
                    placeholder="&#128269; Search..."
                    value={searchTerms.cargoCategory}
                    onChange={(e) =>
                      handleSearchInputChange("cargoCategory", e.target.value)
                    }
                  />
                </li>
                {filteredOptions("cargoCategory").map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      className="btn w-100 text-start font-15"
                      onClick={() => handleOptionClick("cargoCategory", option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row w-50 flex-nowrap row">
          <div className="mb-3">
            <label
              htmlFor="weight"
              className={`mb-1 font-15 ${
                !fieldValidity.weight ? "text-danger" : ""
              }`}
            >
              Weight *
            </label>
            <input
              type="number"
              id="weight"
              className={`input-border form-control h-40 bg-form ${
                !fieldValidity.weight ? "border-danger" : ""
              }`}
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dimension" className="mb-1 font-15">
              Dimensions (meters)
            </label>
            <div className="dimensions-input input-border form-control h-40 bg-form">
              <input
                type="number"
                name="length"
                value={dimension.length}
                placeholder="____________"
                className="bg-transparent"
                onChange={handleDimensionChange}
              />
              <span>x</span>
              <input
                type="number"
                name="width"
                value={dimension.width}
                placeholder="____________"
                className="bg-transparent"
                onChange={handleDimensionChange}
              />
              <span>x</span>
              <input
                type="number"
                name="height"
                value={dimension.height}
                placeholder="____________"
                className="bg-transparent"
                onChange={handleDimensionChange}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-row w-50 flex-nowrap row position-relative">
          <div className="mb-3">
            <label
              htmlFor="price"
              className={`mb-1 font-15 ${
                !fieldValidity.price ? "text-danger" : ""
              }`}
            >
              Price *
            </label>
            <div className="d-flex align-items-center">
              <select
                className="currency lightblue font-md f-bold border-0"
                style={{top:"39%"}}
                name="currency"
                value={formData.currency}
                onChange={handleCurrencyChange}
              >
                <option value="USD">$</option>
                <option value="EUR">€</option>
                <option value="GEL">₾</option>
                <option value="GBP">£</option>
              </select>
              <span className="separator font-23" style={{top:"39%"}}>|</span>
              <input
                type="number"
                className={`main-input input-border form-control h-40 bg-form ${
                  !fieldValidity.price ? "border-danger" : ""
                }`}
                id="price"
                name="price"
                value={formData.price}
                onChange={handlePriceChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="insurance" className="mb-3 font-15">
              Is cargo insured? *
            </label>
            <div className="d-flex align-items-center flex-row">
              <label className="me-4 d-flex flex-row align-items-center">
                <input
                  type="checkbox"
                  name="yes"
                  checked={formData.insurance}
                  onChange={handleCheckboxChange}
                  className="checkbox me-1"
                />
                Yes
              </label>
              <label className="me-2 d-flex flex-row align-items-center">
                <input
                  type="checkbox"
                  name="no"
                  checked={!formData.insurance}
                  onChange={handleCheckboxChange}
                  className="checkbox me-1"
                />
                No
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3 mt-4 comments">
          <label htmlFor="comments" className="mb-1 font-15">
            Comments
          </label>
          <textarea
            name="comments"
            className="input-border form-control h-130 bg-form"
            id="comments"
            value={formData.comments}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="row h-240 m-0 mt-5 mb-5 position-relative ">
          <div
            className={`create-img file d-flex flex-column align-items-center pointer ${
              formData.file ? "uploaded" : ""
            } ${!fieldValidity.price ? " bg-error" : ""}`}
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
              {!formData.file ? (
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
                {formData.file ? formData.file.name : ""}
              </div>
            </div>

            <div className="f-bold mt-4">
              <div className="browse">
                <button>Browse</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

Flat.propTypes = {
  setFormData: PropTypes.func,
  formData: PropTypes.object,
  setAuth: PropTypes.func.isRequired,
  setIsNext: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired, 
};
export default Flat;
