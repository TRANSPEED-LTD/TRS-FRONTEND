import { useForm } from "react-hook-form";
import FormInputs from "./FormInputs"
const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const Submit = () => {
  };

  return (
    <>
      <div className="d-flex flex-column align-items-start">
        <h2 className="font-48">Send us a message</h2>
        <form
          className="mt-38 font-md f-light d-flex flex-column"
          onSubmit={handleSubmit(Submit)}
          noValidate
        >
          <FormInputs register={register} errors={errors} />
          <button
            type="submit"
            className="btn bg-shadeblue text-white font-small rounded-1 pd-1"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
