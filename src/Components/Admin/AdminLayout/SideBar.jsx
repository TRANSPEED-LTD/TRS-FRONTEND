import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "images/Shipify-logo.png";
import "./SideBar.scss";
import { BiSolidDashboard } from "react-icons/bi";
import { TbReceipt } from "react-icons/tb";
import { HiPlusCircle } from "react-icons/hi2";
import { PiClockCountdownFill } from "react-icons/pi";
import { MdNotificationsActive } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import { ROUTES } from "layout/routes";
import { CgProfile } from "react-icons/cg";

function SideBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', company: '' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = Cookies.get('token'); 
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/get-user-info`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUser({
          name: `${response.data.first_name} ${response.data.last_name}`,
          company: response.data.attached_company?.name,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("anotherCookie");
    navigate("/");
  };

  return (
    <div className="max-w-190 bg-main vh-100 sidebar">
      <div className="w-190 bg-main vh-100 position-fixed">
        <div className="d-flex flex-column align-items-center my-4">
          <div className="d-flex flex-row align-items-center ">
            <NavLink to={ROUTES.admin}>
              <img src={logo} alt="logo" className="w-auto" height={40} />
            </NavLink>
            <NavLink to={ROUTES.admin}>
              <h2 className="f-bold font-md me-2 text-white">Shipify</h2>
            </NavLink>
          </div>
          <hr
            style={{
              border: "1px solid white",
              margin: "6px 0px 11px",
            }}
            className="w-164"
          />
          <div className="d-flex flex-column align-items-center justify-content-between font-15">
            <div className="d-flex align-items-center p-6 bg-shadeblue rounded w-164 ">
              <CgProfile className="rounded-pill icon-40 me-2" style={{minWidth:"40px"}}/>
              <div className="d-flex flex-column gap-1">
                <span className="text-white font-small text-break">{user.name}</span>
                <span className="opacity-75 font-12">{user?.company}</span>
              </div>
            </div>

            <div className="d-flex flex-column align-items-start gap-13 mt-90">
              <NavLink
                to={ROUTES.admin}
                end
                className={({ isActive }) =>
                  `btn w-171 pd-2 d-flex flex-row align-items-center grey-90 font-15 ${
                    isActive ? "bg-btn-sidebar" : " "
                  }`
                }
              >
                <BiSolidDashboard className="icon-20 me-2" />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to={ROUTES.order}
                className={({ isActive }) =>
                  `btn w-171 pd-2 d-flex flex-row align-items-center grey-90 font-15 pointer-none ${
                    isActive ? "bg-btn-sidebar" : " "
                  }`}
              >
                <TbReceipt className="icon-20 me-2" />
                <span>Orders</span>
              </NavLink>

              <NavLink
                to={ROUTES.createOrder}
                className={({ isActive }) =>
                  `btn w-171 pd-2 d-flex flex-row align-items-center grey-90 font-15 ${
                    isActive ? "bg-btn-sidebar" : " "
                  }`}
              >
                <HiPlusCircle className="icon-20 me-2" />
                <span>Create order</span>
              </NavLink>

              <NavLink
                to={ROUTES.orderHistory}
                className={({ isActive }) =>
                  `btn w-171 pd-2 d-flex flex-row align-items-center grey-90 font-15 pointer-none ${
                    isActive ? "bg-btn-sidebar" : " "
                  }`}
              >
                <PiClockCountdownFill className="icon-20 me-2" />
                <span>Order history</span>
              </NavLink>

              <NavLink
                to={ROUTES.notifications}
                className={({ isActive }) =>
                  `btn w-171 pd-2 d-flex flex-row align-items-center grey-90 font-15 pointer-none ${
                    isActive ? "bg-btn-sidebar" : " "
                  }`}
              >
                <MdNotificationsActive className="icon-20 me-2" />
                <span>Notifications</span>
              </NavLink>

              <NavLink
                to={ROUTES.settings}
                className={({ isActive }) =>
                  `btn w-171 pd-2 d-flex flex-row align-items-center grey-90 font-15 pointer-none ${
                    isActive ? "bg-btn-sidebar" : " "
                  }`}
              >
                <IoMdSettings className="icon-20 me-2" />
                <span>Settings</span>
              </NavLink>
            </div>

            <div
              className="mt-180 btn w-171 pd-2 d-flex flex-row align-items-center font-15 grey-90 pointer"
              onClick={handleLogout}
            >
              <VscSignOut className="icon-20 me-2" />
              <span>Sign out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
