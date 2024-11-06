import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo/StepTwo";
import us from "images/us.png";
import StepThree from "./StepThree/StepThree";
import StepFour from "./StepFour/StepFour";

const CreateOrder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fromCoords, setFromCoords] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [toCoords, setToCoords] = useState(null);
  const [selectedItem, setSelectedItem] = useState("Tent");
  const [StepFourImage, setStepFourImage] = useState({ file: null });
  const [tentdata, settentdata] = useState({
    transportation_type: "TENT",
    containerType: "",
      cargoName: "",
      loadingType: "",
      nloadingType: "",
      ncontainerType: "",
      ncargoCategory: "",
      ncargoType: "",
      cargoCategory: "",
      cargoType: "",
      dimension: "",
      weight: "",
      insurance: false,
      comments: "",
      currency: "USD",
      price: "",
      file: "",
})
const [reeferdata, setreeferdata] = useState({
  transportation_type: "REEFER",
  containerType: "",
    cargoName: "",
    ncontainerType: "",
    ncargoCategory: "",
    ncargoType: "",
    cargoCategory: "",
    cargoType: "",
    dimension: "",
    weight: "",
    insurance: false,
    comments: "",
    currency: "USD",
    price: "",
    file: "",
})
const [flatdata, setflatdata] = useState({
  transportation_type: "FLAT_BED",
  containerType: "",
    cargoName: "",
    ncontainerType: "",
    ncargoCategory: "",
    ncargoType: "",
    cargoCategory: "",
    cargoType: "",
    dimension: "",
    weight: "",
    insurance: false,
    comments: "",
    currency: "USD",
    price: "",
    file: "",
})
const [selecteddata, setselected] = useState(tentdata);
  const [selectedShipper, setSelectedShipper] = useState(null);
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [companyVat, setCompanies] = useState(null);
  const data = {
    shipper_company_vat: companyVat?.shipper_company_vat,
    carrier_company_vat: companyVat?.carrier_company_vat,
    start_location: fromCoords,
    end_location: toCoords,
    transportation_type: selecteddata?.transportation_type,
    container_type:selecteddata?.ncontainerType,
    ...(selecteddata?.nloadingType && { loading_type: selecteddata.nloadingType }),
    cargo_type:selecteddata?.ncargoType,
    cargo_category:selecteddata?.ncargoCategory,
    cargo_name: selecteddata?.cargoName,
    weight:selecteddata?.weight,
    price:selecteddata?.price,
    insurance:selecteddata?.insurance,
    currency: selecteddata?.currency,
    ...(selecteddata?.comments && { comments: selecteddata.comments }),
    ...(selecteddata?.dimension && { dimension: selecteddata.dimension }),
    files:[selecteddata?.file]
  }

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };


  return (
    <div className="bg-admin w-100 d-flex flex-column">
      <div className="d-flex flex-column mr-32 align-items-center">
        <div className="nav-item us-logo border-0 bg-grey-600 h-40 mt-3 ms-auto">
          <img src={us} alt="US Flag" />
        </div>
      </div>
      {currentStep === 1 && (
        <StepOne
          onNext={goToNextStep}
          setFromCoords={setFromCoords}
          setToCoords={setToCoords}
          from={from} 
          setFrom={setFrom}
          to={to}
          setTo={setTo}
        />
      )}
      {currentStep === 2 && (
        <StepTwo
          onNext={goToNextStep}
          onPrevious={goToPreviousStep}
          setselected={setselected}
          tentdata={tentdata}
          settentdata={settentdata}
          flatdata={flatdata}
          setflatdata={setflatdata}
          reeferdata={reeferdata}
          setreeferdata={setreeferdata}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
      )}
      {currentStep === 3 && (
        <StepThree
          onNext={goToNextStep}
          onPrevious={goToPreviousStep}
          setCompanies={setCompanies}
          selectedShipper={selectedShipper}
          setSelectedShipper={setSelectedShipper} 
          selectedCarrier={selectedCarrier}
          setSelectedCarrier={setSelectedCarrier}
        />
      )}
      {currentStep === 4 && (
        <StepFour data={data} onPrevious={goToPreviousStep} setStepFourImage={setStepFourImage} StepFourImage={StepFourImage} carrierName={selectedCarrier?.name} shipperName={selectedShipper.name}/>
        
      )}
    </div>
  );
};

export default CreateOrder;
