import error from "images/401error.png";
import { Link } from "react-router-dom";
import { ROUTES } from "layout/routes";

const Error401 = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center errorpage">
        <img src={error} alt="401 error" className="w-255"/>
      <h1 className="darkblue font-30 mt-5 mb-3">401 Unauthorized</h1>
      <p className="mb-60 font-20" style={{color:"rgba(36, 48, 63, 0.70)"}}>We could not validate your credentials.</p>
      <Link
          to={ROUTES.signIn}
          className="w-300 btn bg-shadeblue text-white font-small pb-2 pt-2"
        >
          Log in
        </Link>
    </div>
  );
};

export default Error401;
