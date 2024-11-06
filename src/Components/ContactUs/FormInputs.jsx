import PropTypes from "prop-types";
import { EMAIL_PATTERN } from 'utils/constants'; 

const FormInputs = ({ register, errors }) => {
  return (
    <>
      <div className="mb-3 d-flex flex-row justify-content-between">
        <div className="d-flex flex-column">
          <label
            htmlFor="name"
            className={`form-label opacity-75 ${
              errors.name ? "text-danger" : ""
            }`}
          >
            Your Name *
          </label>
          <input
            type="text"
            className={`input-border form-control w-255 h-50 bg-form me-3 ${
              errors.name ? "border-danger" : ""
            }`}
            id="name"
            {...register("name", { required: true })}
          />
        </div>

        <div className="d-flex flex-column">
          <label
            htmlFor="number"
            className={`form-label opacity-75 ${
              errors.number ? "text-danger" : ""
            }`}
          >
            Phone number *
          </label>
          <input
            type="number"
            className={`input-border form-control w-255 h-50 bg-form ${
              errors.number ? "border-danger" : ""
            }`}
            id="number"
            {...register("number", { required: true, minLength: 6 })}
          />
        </div>
      </div>

      <div className="mb-3">
        <label
          htmlFor="email"
          className={`form-label opacity-75 ${
            errors.email ? "text-danger" : ""
          }`}
        >
          Email *
        </label>
        <input
          type="email"
          className={`input-border form-control h-50 bg-form ${
            errors.email ? "border-danger" : ""
          }`}
          id="email"
          {...register("email", EMAIL_PATTERN)}
        />
    
      </div>

      <div className="mb-3">
        <label htmlFor="message" className={`form-label opacity-75 ${
            errors.message ? "text-danger" : ""
          }`}>
          Message *
        </label>
        <textarea
          className={`form-control h-185 bg-form input-border ${
            errors.message ? "border-danger" : ""
          }`}
          id="message"
          {...register("message", { required: true})}
        ></textarea>
      </div>
    </>
  );
};

FormInputs.propTypes = {
  errors: PropTypes.object.isRequired,
  register: PropTypes.func,
};

export default FormInputs;
