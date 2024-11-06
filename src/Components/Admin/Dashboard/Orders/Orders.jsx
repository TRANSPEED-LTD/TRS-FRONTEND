import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "layout/routes";
import SimpleMap from '../Map/SimpleMap';
import { FaArrowLeft } from "react-icons/fa6";
import { BsBox } from "react-icons/bs";
import img from "images/cargo-trailer.png";
import us from "images/us.png";
import Pdf from "./Pdf";
import {
  FlatBedContainer,
  ReeferContainer,
  TentContainer,
  TentLoadingType,
  Cargo,
  CargoCategory
} from "../../CreateOrder/StepTwo/data";
import Cookies from "js-cookie";
import format from 'date-fns/format';

const reverseGeocode = async (lat, lng) => {
  const apiKey = import.meta.env.VITE_API_GOOGLE_API;
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].formatted_address;
    }
  } catch (error) {
    console.error('Error with reverse geocoding:', error);
  }
  return `${lat}, ${lng}`; 
};

const convertCoordinatesToAddress = async (coordinates) => {
  const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord.trim()));
  return await reverseGeocode(lat, lng);
};

const Orders = () => {
  const [isFirst, setSecond] = useState(true);
  const [closePdf, setClosePdf] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');

  const { order_id } = useParams();

  useEffect(() => {
    const token = Cookies.get('token');
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/documents/get-order`, {
      params: { order_id },
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(async response => {
      setOrderData(response.data);

      const startAddr = await convertCoordinatesToAddress(response.data.start_location);
      const endAddr = await convertCoordinatesToAddress(response.data.end_location);

      setStartAddress(startAddr);
      setEndAddress(endAddr);
    })
    .catch(error => console.error('Error fetching order data:', error));
  }, [order_id]);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  const {
    start_location,
    end_location,
    transportation_type,
    cargo_type,
    cargo_category,
    cargo_name,
    weight,
    dimension,
    created_datetime,
    price,
    comments,
    container_type,
    loading_type,
    currency,
    insurance,
    shipper_company_name,
    carrier_company_name,
  } = orderData;

  const getContainerType = (type) => {
    return TentContainer[type] || FlatBedContainer[type] || ReeferContainer[type] || type;
  };

  return (
    <div className="d-flex flex-column w-100 bg-admin">
      <div className="ms-5 d-flex flex-row mr-32 align-items-center justify-content-between mt-3">
        <Link className="text-black-50 mb-0" to={ROUTES.admin}>
          <FaArrowLeft style={{ width: "16px", height: "16px", marginRight: "5px" }} />Back
        </Link>
        <div className="nav-item us-logo border-0 bg-grey-600 h-40">
          <img src={us} alt="US Flag" />
        </div>
      </div>

      <div className="bg-admin px-3 py-2 bg-white mb-1 justify-content-between d-flex flex-row align-items-center me-2 ms-5 mt-2">
        <div className="darkblue font-md">Shipping ID: #{order_id} </div>
        <Link to={ROUTES.createOrder} className="w-101 btn bg-shadeblue text-white font-small">
          Create new
        </Link>
      </div>

      <div className="ms-5 d-flex flex-column me-2">
        <div className="w-100 dash d-flex flex-column p-4 pt-3 mt-2">
          <div className="me-auto darkblue font-md">Map overview</div>
          <div className="opacity-50 darkblue font-12 -mt-5 wp-63 text-end">
            {format(new Date(created_datetime), 'M/d/yy h:mm')}
          </div>
          <div className="mt-4 d-flex flex-row">
            <div className="d-flex flex-column wp-63 align-items-center me-3">
              <SimpleMap from={start_location} to={end_location} heights={"h-270"} />
            </div>
            <div className="d-flex justify-content-between align-items-center flex-column mx-auto mt-3">
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-time font-12 darkblue opacity-50">Start</div>
                  <div className="timeline-content">
                    <div className="timeline-dot"></div>
                    <div className="timeline-text">
                      <div className="font-15 darkblue">Start location</div>
                      <div className="mt-1 font-12 darkblue opacity-50">{startAddress}</div>
                    </div>
                  </div>
                </div>
                <div className="timeline-item" style={{ marginBottom: "0px" }}>
                  <div className="timeline-time font-12 darkblue opacity-50">End</div>
                  <div className="timeline-content sec">
                    <div className="timeline-dot"></div>
                    <div className="timeline-text">
                      <div className="font-15 darkblue">Destination</div>
                      <div className="mt-1 font-12 darkblue opacity-50">{endAddress}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between w-fill">
                <div className="d-flex flex-column me-2">
                  <div className="font-small darkblue opacity-50">Shipper</div>
                  <div className="font-18 shadeblue mt-2 text-decoration-underline pointer">{shipper_company_name}</div>
                </div>
                <div className="d-flex flex-column">
                  <div className="font-small darkblue opacity-50">Carrier</div>
                  <div className="font-18 shadeblue mt-2 text-decoration-underline pointer">{carrier_company_name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-admin bg-white d-flex flex-column pe-2 ps-5 mt-2 py-4">
        <div className="d-flex flex-row darkblue font-small align-items-center">
          <BsBox className="icon-size me-2" /> <span className="darkblue font-md">Order details</span>
        </div>

        <div className="mt-20 d-flex flex-row column-gap-4 mb-4">
          <div className={`font-small pointer ${isFirst ? "text-decoration-underline shadeblue" : "darkblue"}`} onClick={() => setSecond(true)}>Cargo</div>
          <div className={`font-small pointer ${isFirst ? "darkblue" : "text-decoration-underline shadeblue"}`} onClick={() => setSecond(false)}>Documents</div>
        </div>
        {isFirst ? <>
          <div className="d-flex flex-row">
            <div className="d-flex flex-column" style={{ width: "65%" }}>
              <div className="grid-container-details">
                <div>
                  <div className="font-12 darkblue opacity-50">Cargo name</div>
                  <div className="font-15 darkblue mt-2">{cargo_name}</div>
                </div>
                <div>
                  <div className="font-12 darkblue opacity-50">Weight (kg)</div>
                  <div className="font-15 darkblue mt-2">{weight}</div>
                </div>
                <div>
                  <div className="font-12 darkblue opacity-50">Cargo price ({currency})</div>
                  <div className="font-15 darkblue mt-2">{price}</div>
                </div>
                <div>
                  <div className="font-12 darkblue opacity-50">Cargo type</div>
                  <div className="font-15 darkblue mt-2">{Cargo[cargo_type]}</div>
                </div>
                <div>
                  <div className="font-12 darkblue opacity-50">Dimensions (m)</div>
                  <div className="font-15 darkblue mt-2">{dimension ? dimension.replace(/,/g, " x") : "N/A"}</div>
                </div>
                <div>
                  <div className="font-12 darkblue opacity-50">Insurance</div>
                  <div className="font-15 darkblue mt-2">{insurance ? "Yes" : "No"}</div>
                </div>
                <div>
                  <div className="font-12 darkblue opacity-50">Cargo category</div>
                  <div className="font-15 darkblue mt-2">{CargoCategory[cargo_category]}</div>
                </div>
                <div>
                  <div className="font-12 darkblue opacity-50">Loading type</div>
                  <div className="font-15 darkblue mt-2">{TentLoadingType[loading_type] || "N/A"}</div>
                </div>
                <div>
                  <div className="font-12 darkblue opacity-50">Type</div>
                  <div className="font-15 darkblue mt-2">{getContainerType(container_type)}</div>
                </div>
              </div>
              <div className="d-flex flex-column mt-4" style={{ width: "95%" }}>
                <div className="font-12 darkblue opacity-50">Comments</div>
                <div className="font-12 darkblue mt-2 lh-sm mb-4">{comments || "No comments"}</div>
              </div>
            </div>

            <div className="d-flex flex-column align-items-center">
              <div className="h-120 w-255 d-flex flex-column align-items-center cargo">
                <img src={img} alt="cargo-trailer" className="icon-80" />
              </div>
              <div className="darkblue mt-2" style={{ fontSize: "16px" }}>{transportation_type}</div>
            </div>
          </div>
        </> : <Pdf closepdf={closePdf} setclosepdf={setClosePdf} orderData={orderData} startAddress={startAddress} endAddress={endAddress} />}
      </div>
    </div>
  );
};

export default Orders;
