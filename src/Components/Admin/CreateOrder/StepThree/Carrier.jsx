import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { EMAIL_PATTERN } from 'utils/constants';
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaTrashAlt } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
import PropTypes from "prop-types";

const currencies = [
  "₾ GEL", "$ USD", "€ EUR", "֏ AMD", "$ AUD", "₼ AZN", "$ CAD", "CHF", "¥ CNY", "£ GBP", "¥ JPY", "$ NZD", "SEK",
];

const Carrier = ({onSuccess}) => {
  const { register, handleSubmit, control, setError, clearErrors, reset, getValues, formState: { errors } } = useForm({
    defaultValues: {
      ibans: [{ bank_name: "", currency: currencies[0], account_number: "" }],
      phone_number: ''
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ibans",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [issuccess, setsuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errornumber, seterrornumber] = useState('');

  const onSubmit = async (data) => {
    seterrornumber('')
    setLoading(true);
    setErrorMessage(null);
    if (phoneNumber.length < 6) {
      seterrornumber("Please enter a valid phone number.")
      setLoading(false);
      return;
    }
    try {
      const token = Cookies.get("token");
      const ibans = data.ibans.map(iban => ({
        ...iban,
        currency: iban.currency.split(" ").pop()
      }));
      const dataWithPartyType = { ...data, "party_type": "CARRIER", ibans, "phone_number": phoneNumber };
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
        onSuccess(response.data);
        setsuccess(true);
        reset();
        setPhoneNumber('')
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
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
      {issuccess && (
        <div className="alert alert-success mt-3" role="sucess">
          Company created successfully
        </div>
      )}
      <form
        className="mt-4 font-md f-light d-flex mx-4 flex-column text-black"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="d-flex flex-row justify-content-around">
        <div className="d-flex flex-column align-items-start mr-32 max-w-450 w-fill">
        <div className="d-flex flex-column mb-2 mt-1 w-100">
          <label
            htmlFor="Companyname"
            className={`opacity-75 mb-1 font-15 ${errors.name ? "text-danger" : ""}`}
          >
            Company Name *
          </label>
          <input
            type="text"
            className={`input-border form-control h-40 bg-form accnumber ${errors.name ? "border-danger" : ""}`}
            id="Companyname"
            placeholder="E.g.: PSP LLC"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-danger font-10 pt-1">Company name is required</p>
          )}
        </div>

        <div className="d-flex flex-column mt-1 mb-2 w-100">
          <label
            htmlFor="Vatnumber"
            className={`opacity-75 mb-1 font-15 ${errors.vat_number ? "text-danger" : ""}`}
          >
           Company VAT number *
          </label>
          <input
            type="text"
            className={`input-border form-control h-40 bg-form  accnumber ${errors.vat_number ? "border-danger" : ""}`}
            id="Vatnumber"
            placeholder="E.g.: 145848646564 "
            {...register("vat_number", { required: true })}
          />
          {errors.vat_number && (
            <p className="text-danger font-10 pt-1">VAT number is required</p>
          )}
        </div>

        <div className="d-flex flex-column mt-1 mb-2 w-100">
          <label
            htmlFor="Vatnumber"
            className={`opacity-75 mb-1 font-15 ${errors.vat_number ? "text-danger" : ""}`}
          >
           Company address *
          </label>
          <input
            type="text"
            className={`input-border form-control h-40 bg-form accnumber ${errors.address ? "border-danger" : ""}`}
            id="address"
            placeholder="E.g.: 329N North Street PA"
            {...register("address", { required: true })}
          />
          {errors.address && (
            <p className="text-danger font-10 pt-1">Address is required</p>
          )}
        </div>
        </div>

        <div className="d-flex flex-column align-items-start max-w-525 w-fill">
          <p className="opacity-75 mb-1 font-15 mt-1">Contact person *</p>
          <div className="d-flex flex-row align-items-center w-100">
          <RiAccountCircleLine className="icon-40 opacity-75"/>
          <input
            type="text"
            className={`input-border form-control h-40 ms-3 bg-form accnumber ${errors.contact_name ? "border-danger" : ""}`}
            id="contact_name"
            placeholder="E.g.: Tornike"
            {...register("contact_name", { required: true })}
          />
          
          </div>
          {errors.contact_name && (
            <p className="text-danger font-10 pt-1 ms-5">Contact name is required</p>
          )}
           <div className="d-flex flex-row align-items-center w-100 mt-12">
          <IoIosMail className="icon-40 opacity-75"/>
          <input
            type="email"
            className={`input-border form-control h-40 ms-3 bg-form accnumber ${errors.contact_email ? "border-danger" : ""}`}
            id="contact_email"
            placeholder="E.g.: tornike@psp.com"
            {...register("contact_email", EMAIL_PATTERN)}
          />
          </div>
          {errors.contact_email && (
            <p className="text-danger font-10 pt-1 ms-5">{errors.contact_email?.message}</p>
          )}
           <div className="d-flex flex-row align-items-center w-100 mt-12">
              <FaPhoneAlt className="icon-32 opacity-75 me-1 " />
              <PhoneInput
                country={'us'} 
                value={phoneNumber}
                onChange={setPhoneNumber}
                inputProps={{
                  className: `input-border form-control h-40 ms-3 bg-form accnumber ${errornumber ? "border-danger" : ""}`,
                  required: true, 
                }}
              />
            </div>
        </div>
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
                    className={`input-border form-control h-40 f-medium accnumber w-100 bg-form ${errors.ibans?.[index]?.account_number ? "border-danger" : ""}`}
                    {...register(`ibans.${index}.account_number`, { required: true })}
                    onChange={(e) => handleUpperCase(e)}
                  />
                  {fields.length > 1 && (
                    <FaTrashAlt onClick={() => remove(index)} className="pointer icon-size ms-1 min-w-21 opacity-50" />
                  )}
                </>
              )}
            </div>
          ))}
          <button type="button" className="btn text-white bg-shadeblue mt-1 p-1 w-101 ms-auto" onClick={handleAddIban}>
            Add
          </button>
        </div>

        <div className="d-flex flex-row gap-2 mb-3 f-normal mt-4 w-350 ms-auto">
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
              'Add Carrier'
            )}
          </button>
        </div>
      </form>
    </>
  );
};

Carrier.propTypes = {
  onSuccess: PropTypes.func,
};

export default Carrier;
