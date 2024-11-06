import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bglogin from "images/bg-login.png";
import Reset from "./Reset";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EMAIL_PATTERN } from "utils/constants";
import Cookies from "js-cookie";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login-user`,
        data
      );
      if (response.status === 200) {
        Cookies.set("token", response.data.token, {
          // httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
        navigate("/admin");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("The email address or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <img className="col-6 p-0" src={bglogin} alt="background" />
          <div className="col-6 bg-auth">
            <div className="max-w-525 ml-60">
              <h3 className=" font-30 darkblue my-60">Log in</h3>

              {errorMessage && (
                <div className="alert alert-danger mt-0" role="alert">
                  {errorMessage}
                </div>
              )}

              <form
                className="mt-38 font-md f-light d-flex flex-column text-black"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className="d-flex flex-column mb-3">
                  <label
                    htmlFor="email"
                    className={`opacity-75 mb-1 font-15 ${
                      errorMessage || errors.email ? "text-danger" : ""
                    } `}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    className={`input-border form-control h-40 bg-form ${
                      errorMessage || errors.email ? "border-danger" : ""
                    }`}
                    id="email"
                    {...register("email", EMAIL_PATTERN)}
                  />
                </div>
                <div className="d-flex flex-column mb-2">
                  <label
                    htmlFor="password"
                    className={`opacity-75 mb-1 font-15 ${
                      errorMessage || errors.password ? "text-danger" : ""
                    } `}
                  >
                    Password *
                  </label>
                  <input
                    type="password"
                    className={`input-border form-control h-40 bg-form ${
                      errorMessage || errors.password ? "border-danger" : ""
                    }`}
                    id="password"
                    {...register("password", { required: true })}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-130">
                  <div className="d-flex align-items-center flex-row">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="me-2 checkbox"
                    />
                    <label htmlFor="rememberMe" className="opacity-75 font-15">
                      Remember me
                    </label>
                  </div>
                  <div
                    className="text-decoration-none opacity-75 font-15 f-bold lightblue pointer"
                    onClick={handleOpenModal}
                  >
                    Forgot password?
                  </div>
                </div>
                <button
                  type="submit"
                  className={`btn bg-shadeblue text-white font-small rounded-1 pd-1 mb-5 f-normal ${
                    loading ? "pointer-none" : ""
                  }`}
                >
                  {loading ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <span>Loading...</span>
                      <span className="spinner-border ms-2 icon-size"></span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
              <hr
                style={{
                  width: "345px",
                  height: "3px",
                  backgroundColor: "black",
                  margin: "0px auto 11px",
                }}
              />
              <p className="font-15 f-light text-center text-black opacity-75 mb-5">
                Don&apos;t have an account yet?
                <Link to="/register" className="f-bold lightblue pointer">
                  {" "}
                  Sign up
                </Link>
              </p>
            </div>
            <Reset showModal={showModal} handleClose={handleCloseModal} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
