import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const isAuthenticated = () => {
  const token = Cookies.get('token');
  return !!token;
};

const ProtectedRoute = ({ children }) => { 
  return isAuthenticated() ? children : <Navigate to="/401" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;