import bglogin from "images/bg-login.png";

const Resetpassword = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 bg-auth">
            <div className=" max-w-525 ml-100">
              <h3 className=" font-30 darkblue my-60">Reset password</h3>
              <form
                className="mt-38 font-md f-light d-flex flex-column  text-black "
                noValidate
              >
                <div className="d-flex flex-column mb-3">
                  <label
                    htmlFor="newpassword"
                    className={`opacity-75 mb-1 font-15 `}
                  >
                    New password *
                  </label>
                  <input
                    type="password"
                    className={`input-border form-control h-40 bg-form `}
                    id="newpassword"
                  />
                </div>
                <div className="d-flex flex-column mb-185">
                  <label
                    htmlFor="cpassword"
                    className={`opacity-75 mb-1 font-15 `}
                  >
                    Confirm password *
                  </label>
                  <input
                    type="password"
                    className={`input-border form-control h-40 bg-form`}
                    id="cpassword"
                  />
                </div>
                <button
                  type="submit"
                  className="btn bg-shadeblue text-white font-small rounded-1 pd-1 mb-5 f-normal"
                >
                  Reset
                </button>
              </form>
            </div>
          </div>
          <img className="col-6 p-0" src={bglogin} alt="background" />
        </div>
      </div>
    </>
  );
};

export default Resetpassword;
