import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import trailer from "images/trailers.png";
import ffp from "images/ffp.png";
import "./HomeStyles.scss"
import { AuthContext } from "../auth/AuthContext";

const Home = () => {

  const { user, authChecked } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authChecked && user) {
      navigate("/admin");
    }
  }, [authChecked, user, navigate]);


  return (
    <div className="home-bg">
      <div className="max-w-1050 d-flex justify-content-center align-items-center mx-auto px-2">
        <div className="home-cont">
          <div className="content">
              <h1 className="lh-sm fs-1 max-w-400 pb-3 f-bold">Your assistant for hassle free shipping</h1>
              <p className="lh-sm max-w-400 pb-5 f-light">Transforming logistics excellence: experience unmatched real-time cargo tracking and intuitive document management solutions</p>
              <button type="button" className="p-4 btn btn-lg d-flex align-items-center justify-content-between">Get Started <img src={ffp} /></button>
          </div>
          <div className="home-img">
            <img src={trailer}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
