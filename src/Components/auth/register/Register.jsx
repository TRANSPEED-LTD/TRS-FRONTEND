import bgregister from "images/bg-register.png";
import RegisterInputs from "./RegisterInputs";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <img className="col-6 p-0" src={bgregister} />
          <div className="col-6 bg-auth">
            <div className="max-w-525 ml-60">
              <RegisterInputs/>
              <hr
                style={{
                  width: "345px",
                  height: "3px",
                  backgroundColor: "black",
                  margin: "4px auto 12px",
                }}
              />
              <p className="font-15 f-light text-center text-black opacity-75 mb-3">
              Already have an account? 
                <Link to="/login" className="f-bold lightblue pointer"> Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
