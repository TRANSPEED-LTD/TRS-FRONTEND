import { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleMap from './Map/SimpleMap';
import { FaArrowRight } from 'react-icons/fa6';
import { BsBox } from 'react-icons/bs';
import us from 'images/us.png';
import { Link } from 'react-router-dom';
import { ROUTES } from 'layout/routes';
import './dashboard.scss';
import Cookies from "js-cookie";
import format from 'date-fns/format';
import { Cargo, CargoCategory } from "../CreateOrder/StepTwo/data";
import Dashboard2 from './Dashboard2';

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

const Dashboard = () => {
  const [loading, setLoading] = useState(true); 
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const fetchOrders = async () => {
    setLoading(true)
    const token = Cookies.get('token');
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/documents/get-orders`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setOrders(response.data);
      const addressPromises = response.data.map(async (order) => {
        const startAddr = await convertCoordinatesToAddress(order.start_location);
        const endAddr = await convertCoordinatesToAddress(order.end_location);
        return { startAddr, endAddr };
      });
      setLoading(false)

      const addresses = await Promise.all(addressPromises);
      setAddresses(addresses);

    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.slice(1);

  return (
    <>
    {loading ? <></> : 
      orders.length > 0 ? 
        <div className="d-flex flex-column w-100 bg-admin">
          <div className="ms-5 d-flex flex-column mr-32 align-items-center">
            <div className="nav-item us-logo border-0 bg-grey-600 h-40 mt-3 ms-auto">
              <img src={us} alt="US Flag" />
            </div>
            <div className="darkblue h4 -mt-10 me-auto">Dashboard</div>
            <Link
              to={ROUTES.createOrder}
              className="w-101 ms-auto -mt-10 btn bg-shadeblue text-white font-small"
            >
              Create new
            </Link>
          </div>

          <div className="ms-5 d-flex flex-column me-2">
            <div className="w-100 dash d-flex flex-column p-4 pt-3 mt-2">
              <div className="me-auto darkblue font-md">Most recent</div>
              <div className="ms-auto opacity-50 darkblue font-12 -mt-5">
                {orders[0]?.created_datetime && format(new Date(orders[0].created_datetime), 'M/d/yy h:mm')}
              </div>
              <div className="mt-4 d-flex flex-row">
                <div className="d-flex flex-column wp-63 align-items-center">
                  {orders.length > 0 && (
                    <SimpleMap
                      from={orders[0].start_location}
                      to={orders[0].end_location}
                      heights="h-270"
                    />
                  )}
                  <div className="mt-4 font-15 darkblue">
                    {addresses.length > 0 && addresses[0]?.startAddr}
                    <FaArrowRight className="icon-20 mx-1" style={{ marginTop: '-3px' }} />
                    {addresses.length > 0 && addresses[0]?.endAddr}
                  </div>
                </div>
                <hr
                  className="h-240"
                  style={{
                    width: '1px',
                    backgroundColor: '#9d9d9d',
                    margin: '5px 20px auto 20px',
                    opacity: '1',
                    color: '#f5f2ef',
                  }}
                />
                <div className="d-flex justify-content-between align-items-center flex-column mx-auto mt-3">
                  <div className="container-grid">
                    <div>
                      <div className="font-12 darkblue opacity-50">Transportation type</div>
                      <div className="font-13 darkblue mt-2">{orders[0]?.transportation_type}</div>
                    </div>
                    <div>
                      <div className="font-12 darkblue opacity-50">Cargo name</div>
                      <div className="font-13 darkblue mt-2">{orders.length > 0 && orders[0].cargo_name}</div>
                    </div>
                    <div>
                      <div className="font-12 darkblue opacity-50">Weight (kg)</div>
                      <div className="font-13 darkblue mt-2">{orders.length > 0 && orders[0].weight}</div>
                    </div>
                    <div>
                      <div className="font-12 darkblue opacity-50">Cargo type</div>
                      <div className="font-13 darkblue mt-2">{orders.length > 0 && Cargo[orders[0].cargo_type]}</div>
                    </div>
                    {orders[0]?.dimension ?
                      <div>
                        <div className="font-12 darkblue opacity-50">Dimensions (m)</div>
                        <div className="font-13 darkblue mt-2 text-break">{orders[0].dimension.replace(/,/g, " x")}</div>
                      </div>
                      : null}
                    <div>
                      <div className="font-12 darkblue opacity-50">Cargo category</div>
                      <div className="font-13 darkblue mt-2">{orders.length > 0 && CargoCategory[orders[0].cargo_category]}</div>
                    </div>
                  </div>
                  <Link className="w-190 btn bg-shadeblue text-white font-small pb-2 pt-2" to={`/admin/order/${orders[0].order_id}`}>
                    See more details
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="ms-5 d-flex flex-row me-2 mt-1 flex-wrap justify-content-between">
            {filteredOrders.map((order, index) => (
              <div key={index} className="bg-admin wp-33 p-20 bg-white mb-2">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row darkblue font-small align-items-center">
                    <BsBox className="icon-20 me-1" />
                    <span className="darkblue font-small">#{order.order_id}</span>
                  </div>
                  <div className="text-success">In delivery</div>
                </div>
                <div className="mt-20 w-100">
                  <SimpleMap from={order.start_location} to={order.end_location} heights="h-120" />
                </div>
                <div className="mt-20 font-10 darkblue text-center">
                  {addresses[index + 1]?.startAddr}
                  <FaArrowRight className="mx-1" style={{ marginTop: '-3px', width: '16px', height: '16px' }} />
                  {addresses[index + 1]?.endAddr}
                </div>
                <hr
                  style={{
                    width: '250px',
                    height: '2px',
                    backgroundColor: '#9d9d9d',
                    margin: '15px auto 18px',
                    opacity: '1',
                    color: '#f5f2ef',
                  }}
                />
                <div className="d-flex justify-content-between align-items-center flex-row flex-wrap">
                  <div>
                    <div className="font-12 darkblue opacity-50 w-max">Cargo name</div>
                    <div className="font-13 darkblue my-2">{order.cargo_name}</div>
                  </div>
                  <div>
                    <div className="font-12 darkblue opacity-50 w-max">Cargo type</div>
                    <div className="font-13 darkblue my-2">{Cargo[order.cargo_type]}</div>
                  </div>
                  <div>
                    <div className="font-12 darkblue opacity-50 w-max">Cargo category</div>
                    <div className="font-13 darkblue my-2">{CargoCategory[order.cargo_category]}</div>
                  </div>
                </div>
                <Link className="w-190 btn bg-shadeblue text-white font-small pb-2 pt-2 mt-20 mx-auto d-flex align-items-center justify-content-center" to={`/admin/order/${order.order_id}`}>
                  Details
                </Link>
              </div>
            ))}
          </div>
        </div>
        : <><Dashboard2 /></>}
    </>
  );
};

export default Dashboard;
