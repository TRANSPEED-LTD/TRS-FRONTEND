import { HiBuildingOffice2 } from "react-icons/hi2";
import { useForm, useFieldArray } from "react-hook-form";
import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const currencies = [
  "₾ GEL", "$ USD", "€ EUR", "֏ AMD", "$ AUD", "₼ AZN", "$ CAD", "CHF", "¥ CNY", "£ GBP", "¥ JPY", "$ NZD", "SEK",
];

const RegisterInputs2 = ({ goBack }) => {
  const { register, handleSubmit, control, setError, clearErrors, getValues, formState: { errors } } = useForm({
    defaultValues: {
      ibans: [{ bank_name: "", currency: currencies[0], account_number: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ibans",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [termsChecked, setTermsChecked] = useState(false);

  const handleTermsChange = (event) => {
    setTermsChecked(event.target.checked);
};    

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(null);
    if (!termsChecked) {
      setLoading(false);
      return;
    }
    try {
      const token = Cookies.get("token");
      const ibans = data.ibans.map(iban => ({
        ...iban,
        currency: iban.currency.split(" ").pop()
      }));
      const dataWithPartyType = { ...data, "party_type": "FORWARDER", ibans };
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/companies/create-company`,
        dataWithPartyType,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      if (response.status === 200) {
        navigate("/admin");
      } else {
        setErrorMessage('Failed to create company. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage('Failed to create company. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddIban = () => {
    const ibans = getValues("ibans");
    const lastIban = ibans[ibans.length - 1];
    const isLastIbanFilled = lastIban.bank_name.trim() !== "" && lastIban.account_number.trim() !== "";

    if (!isLastIbanFilled) {
      if (!lastIban.bank_name.trim()) setError(`ibans.${ibans.length - 1}.bank_name`, { type: "manual", message: "Required" });
      if (!lastIban.account_number.trim()) setError(`ibans.${ibans.length - 1}.account_number`, { type: "manual", message: "Required" });
      return;
    }

    append({ bank_name: "", currency: currencies[0], account_number: "" });
    clearErrors();
  };

  const handleUpperCase = (event) => {
    event.target.value = event.target.value.toUpperCase();
  };

  return (
    <>
      <h3 className="font-30 darkblue my-4">Create a company</h3>
      <div className="d-flex flex-row align-items-center">
        <HiBuildingOffice2
          className="text-black-50"
          style={{ width: "27px", height: "27px" }}
        />
        <p
          style={{
            color: "rgba(36, 48, 63, 0.60)",
            fontSize: "18px",
            marginLeft: "14px",
          }}
        >
          Company information
        </p>
      </div>
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
      <form
        className="mt-4 font-md f-light d-flex flex-column text-black"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="d-flex flex-column mb-2 mt-1">
          <label
            htmlFor="Companyname"
            className={`opacity-75 mb-1 font-15 ${errors.name ? "text-danger" : ""}`}
          >
            Company Name *
          </label>
          <input
            type="text"
            className={`input-border form-control h-40 bg-form me-2 ${errors.name ? "border-danger" : ""}`}
            id="Companyname"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-danger font-10 pt-1">Company name is required</p>
          )}
        </div>

        <div className="d-flex flex-column mt-1 mb-2">
          <label
            htmlFor="Vatnumber"
            className={`opacity-75 mb-1 font-15 ${errors.vat_number ? "text-danger" : ""}`}
          >
            VAT number *
          </label>
          <input
            type="text"
            className={`input-border form-control h-40 bg-form ${errors.vat_number ? "border-danger" : ""}`}
            id="Vatnumber"
            {...register("vat_number", { required: true })}
          />
          {errors.vat_number && (
            <p className="text-danger font-10 pt-1">VAT number is required</p>
          )}
        </div>

        <div className="d-flex flex-column mt-1 mb-2">
          <label
            htmlFor="Address"
            className={`opacity-75 mb-1 font-15 ${errors.address ? "text-danger" : ""}`}
          >
            Address *
          </label>
          <input
            type="text"
            className={`input-border form-control h-40 bg-form ${errors.address ? "border-danger" : ""}`}
            id="Address"
            {...register("address", { required: true })}
          />
          {errors.address && (
            <p className="text-danger font-10 pt-1">Address is required</p>
          )}
        </div>

        <div className="mt-1 mb-5 d-flex flex-column">
          <label className="opacity-75 mb-1 font-15">Company IBAN *</label>
          {fields.map((field, index) => (
            <div key={field.id} className="d-flex flex-row gap-1 align-items-center mb-1">
              {index !== fields.length - 1 ? (
                <>
                  <input
                    type="text"
                    className="h-40 w-55 text-center f-medium bankname darkblue border-0 bg-transparent pointer-none"
                    {...register(`ibans.${index}.bank_name`)}
                  />
                  <div className="d-flex align-items-center input-border form-control h-40 f-medium accnumber bg-form pointer-none">
                    <span className="shadeblue">{field.currency[0]}</span> 
                    <span className="mx-1 opacity-50 h4 mb-1">|</span>
                    <span className="opacity-50">{field.account_number}</span>
                  </div>
                  {fields.length > 1 && (
                    <FaTrashAlt onClick={() => remove(index)} className="pointer icon-size ms-1 opacity-50" />
                  )}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="E.g.: BOG"
                    className={`input-border form-control h-40 w-55 text-center f-medium bankname bg-form ${errors.ibans?.[index]?.bank_name ? "border-danger" : ""}`}
                    {...register(`ibans.${index}.bank_name`, { required: true })}
                    onChange={(e) => handleUpperCase(e)}
                  />
                  <select
                    {...register(`ibans.${index}.currency`, { required: true })}
                    className={`input-border form-control h-40 text-center shadeblue w-74 bg-form ${errors.ibans?.[index]?.currency ? "border-danger" : ""}`}
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency} className="text-left">
                        {currency}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="E.g.: GB82WEST12345698765432"
                    className={`input-border form-control h-40 f-medium accnumber w-400 bg-form ${errors.ibans?.[index]?.account_number ? "border-danger" : ""}`}
                    {...register(`ibans.${index}.account_number`, { required: true })}
                    onChange={(e) => handleUpperCase(e)}
                  />
                  {fields.length > 1 && (
                    <FaTrashAlt onClick={() => remove(index)} className="pointer icon-size ms-1 opacity-50" />
                  )}
                </>
              )}
            </div>
          ))}
          <button type="button" className="btn text-white bg-shadeblue mt-1 p-1 w-101 ms-auto" onClick={handleAddIban}>
            Add
          </button>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center flex-row">
            <input
                type="checkbox"
                id="terms"
                className="me-2 checkbox"
                onChange={handleTermsChange}
            />
            <label htmlFor="terms" className={`opacity-75 font-15 ${!termsChecked ? "checkvalid" : ""}`}>
              I accept{" "}
              <span className="f-bold lightblue pointer">terms of service</span>{" "}
              & <span className="f-bold lightblue pointer">privacy policy</span>
            </label>
          </div>
        </div>
        <div className="d-flex flex-row gap-2 mb-2 f-normal mt-2 ">
          <div
            className="btn bg-white text-black font-small rounded-1 pd-1 input-border w-100 "
            onClick={goBack}
          >
            Go back
          </div>
          <button
            type="submit"
            className={`btn bg-shadeblue text-white font-small rounded-1 pd-1 w-100 ${loading ? "pointer-none" : ""}`}
          >
            {loading ? (
              <div className="d-flex align-items-center justify-content-center">
                <span>Loading...</span>
                <span className="spinner-border ms-2 icon-size"></span>
              </div>
            ) : (
              'Register'
            )}
          </button>
        </div>
      </form>
    </>
  );
};

RegisterInputs2.propTypes = {
  goBack: PropTypes.func.isRequired,
};

export default RegisterInputs2;
