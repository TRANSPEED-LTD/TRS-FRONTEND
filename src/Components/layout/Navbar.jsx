import { NavLink, useLocation, Link } from 'react-router-dom';
import { ROUTES } from 'layout/routes';
import logo from "images/Shipify-logo.png";
import us from "images/us.png";

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <nav className="bg-main" style={{ borderBottom: "2px black solid" }}>
        <div className="d-flex justify-content-between align-items-center mx-auto px-2 h-86 max-w-1050">
          <div className="d-flex flex-row align-items-center">
            <Link to="/">
              <img src={logo} alt="logo" className="w-auto" height={64} />
            </Link>
            <Link to="/">
            <h2 className="ms-1 f-bold" style={{ fontSize: "27px" }}>
              Shipify
            </h2>
            </Link>
          </div>
          <div className="d-flex font-small align-items-center" style={{ gap: "65px" }}>
            <div className="nav-item">
              <NavLink to={ROUTES.home} className={location.pathname === ROUTES.home ? "active" : ""}>
                Home
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink to={ROUTES.products} className={location.pathname === ROUTES.products ? "active" : ""}>
                Products
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink to={ROUTES.aboutUs} className={location.pathname === ROUTES.aboutUs ? "active" : ""}>
                About Us
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink to={ROUTES.contactUs} className={location.pathname === ROUTES.contactUs ? "active" : ""}>
                Contact
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink to={ROUTES.signIn} className="bg-shadeblue text-white font-small rounded-1 pd-1">
                Sign in
              </NavLink>
            </div>
            <div className="nav-item us-logo">
              <NavLink to="#">
                <img src={us} alt="US Flag" />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
