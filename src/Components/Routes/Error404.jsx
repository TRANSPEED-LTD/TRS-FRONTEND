import error from "images/404error.png";
import { Link } from "react-router-dom";
import { ROUTES } from "layout/routes";

const Error404 = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center errorpage">
        <img src={error} alt="404 error" className="w-255"/>
      <h1 className="darkblue font-30 mt-5 mb-3">404 Page not found</h1>
      <p className="mb-60 font-20" style={{color:"rgba(36, 48, 63, 0.70)"}}>The page you are looking for does not exist</p>
      <Link
          to={ROUTES.home}
          className="w-300 btn text-black font-small pb-2 pt-2 bg-white input-border"
        >
          Go back
        </Link>
    </div>
  );
};

export default Error404;
