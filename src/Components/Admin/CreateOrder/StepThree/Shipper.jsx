import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { EMAIL_PATTERN } from 'utils/constants';
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiAccountCircleLine } from "react-icons/ri";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import PropTypes from "prop-types";

const Shipper = ({success}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({});

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [issuccess, setIsSuccess] = useState(false);
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
      const dataWithPartyType = {
        ...data,
        "party_type": "SHIPPER",
        "phone_number": phoneNumber
      };
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
        success(response.data)
        setIsSuccess(true);
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
                className={`opacity-75 mb-1 font-15 ${errors.address ? "text-danger" : ""}`}
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
              'Add shipper'
            )}
          </button>
        </div>
      </form>
    </>
  );
};
Shipper.propTypes = {
  success: PropTypes.func,
};


export default Shipper;
