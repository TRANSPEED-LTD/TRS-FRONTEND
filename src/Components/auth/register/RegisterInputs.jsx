import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useState } from "react";
import RegisterInputs2 from "./RegisterInputs2";
import { EMAIL_PATTERN, PASSWORD_PATTERN, NAME_PATTERN, PHONE_NUMBER_PATTERN } from 'utils/constants';
import axios from 'axios';
import Cookies from 'js-cookie';

const RegisterInputs = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const Submit = async (data) => {
    setErrorMessage(null);
    setSuccessMessage(false);
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/create-user`, data);
      if (response.status === 200) {
        setSuccessMessage(true);
        const token = response.data.token;
        Cookies.set("token", token); 
        setTimeout(() => {
          setStep(2);
        }, 1200);
      } else {
        setErrorMessage('Failed to create user. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage('Failed to create user. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setStep(1);
  };

  return (
    <>
      {step === 1 && (
        <>
          <h3 className="font-30 darkblue my-4">Create an user</h3>
          <div className="d-flex flex-row align-items-center">
            <IoPersonSharp
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
              Personal information
            </p>
          </div>
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success mt-3" role="alert">
              User successfully created
            </div>
          )}
          <form
            className="mt-20 font-md f-light d-flex flex-column text-black "
            onSubmit={handleSubmit(Submit)}
            noValidate
          >
            <div className="mb-2 d-flex flex-row gap-2">
              <div className="d-flex flex-column w-100">
                <label htmlFor="name" className={`opacity-75 mb-1 font-15 ${errors.first_name ? "text-danger" : ""}`}>
                  Your Name *
                </label>
                <input
                  type="text"
                  className={`input-border form-control h-40 bg-form me-2 ${errors.first_name ? "border-danger" : ""}`}
                  id="name"
                  {...register("first_name", NAME_PATTERN)}
                />
                {errors.first_name?.message && (
                  <span className="font-10 text-danger mt-1">
                    {errors.first_name?.message}
                  </span>
                )}
              </div>

              <div className="d-flex flex-column w-100">
                <label htmlFor="lastname" className={`opacity-75 mb-1 font-15 ${errors.last_name ? "text-danger" : ""}`}>
                  Last name *
                </label>
                <input
                  type="text"
                  className={`input-border form-control h-40 bg-form ${errors.last_name ? "border-danger" : ""}`}
                  id="lastname"
                  {...register("last_name", NAME_PATTERN)}
                />
                {errors.last_name?.message && (
                  <span className="font-10 text-danger mt-1">
                    {errors.last_name?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="d-flex flex-column mb-2 mt-1">
              <label htmlFor="email" className={`opacity-75 mb-1 font-15 ${errors.email ? "text-danger" : ""}`}>
                Email *
              </label>
              <input
                type="email"
                className={`input-border form-control h-40 bg-form ${errors.email ? "border-danger" : ""}`}
                id="email"
                {...register("email", EMAIL_PATTERN)}
              />
              {errors.email?.message && (
                <span className="font-10 text-danger mt-1">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="d-flex flex-column mb-2 mt-1">
              <label htmlFor="phoneNumber" className={`opacity-75 mb-1 font-15 ${errors.phone_number ? "text-danger" : ""}`}>
                Phone number *
              </label>
              <input
                type="number"
                className={`input-border form-control h-40 bg-form ${errors.phone_number ? "border-danger" : ""}`}
                id="phoneNumber"
                {...register("phone_number", PHONE_NUMBER_PATTERN)}
              />
              {errors.phone_number?.message && (
                <span className="font-10 text-danger mt-1">
                  {errors.phone_number?.message}
                </span>
              )}
            </div>
            <div className="d-flex flex-column mb-2 mt-1">
              <label htmlFor="password" className={`opacity-75 mb-1 font-15 ${errors.password ? "text-danger" : ""}`}>
                Password *
              </label>
              <input
                type="password"
                className={`input-border form-control h-40 bg-form ${errors.password ? "border-danger" : ""}`}
                id="password"
                {...register("password", PASSWORD_PATTERN)}
              />
              {errors.password?.message && (
                <span className="font-10 text-danger mt-1">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <div className="d-flex flex-column mb-60 mt-1">
              <label htmlFor="rpassword" className={`opacity-75 mb-1 font-15 ${errors.rpassword ? "text-danger" : ""}`}>
                Retype password *
              </label>
              <input
                type="password"
                className={`input-border form-control h-40 bg-form ${errors.rpassword ? "border-danger" : ""}`}
                id="rpassword"
                {...register("rpassword", {
                  required: true,
                  validate: (value) => {
                    return value === watch('password') || 'Password does not match'
                  }
                })}
              />
              {errors.rpassword?.message && (
                <span className="font-10 text-danger mt-1">
                  {errors.rpassword?.message}
                </span>
              )}
            </div>
            <div className="d-flex flex-row gap-2 mb-2 f-normal mt-2">
              <Link
                to="/login"
                className="btn bg-white text-black font-small rounded-1 pd-1 input-border w-100"
              >
                Cancel
              </Link>
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
                  'Go next'
                )}
              </button>
            </div>
          </form>
        </>
      )}
      {step === 2 && (
        <RegisterInputs2 goBack={goBack} />
      )}
    </>
  );
};

export default RegisterInputs;
