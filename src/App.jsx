import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactUs from "./Components/ContactUs/ContactUs";
import Home from "./Components/Home/Home";
import Login from "./Components/auth/Login";
import { AuthProvider } from './Components/auth/AuthContext';
import Register from "./Components/auth/register/Register";
import AdminLayout from "./Components/Admin/AdminLayout/AdminLayout";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import Layout from "./Components/layout/Layout";
import CreateOrder from "./Components/Admin/CreateOrder/CreateOrder";
import Error401 from "./Components/Routes/Error401";
import Error404 from "./Components/Routes/Error404";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import { ROUTES } from 'layout/routes';
import Orders from "./Components/Admin/Dashboard/Orders/Orders";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.home} element={<Layout><Home /></Layout>} />
          <Route path={ROUTES.contactUs} element={<Layout><ContactUs /></Layout>} />
          <Route path={ROUTES.signIn} element={<Layout><Login /></Layout>} />
          <Route path={ROUTES.register} element={<Layout><Register /></Layout>} />
          <Route path={ROUTES.admin} element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/order/:order_id" element={<ProtectedRoute><AdminLayout><Orders/></AdminLayout></ProtectedRoute>} />
          <Route path={ROUTES.createOrder} element={ <ProtectedRoute> <AdminLayout><CreateOrder /></AdminLayout></ProtectedRoute>} />
          <Route path="/401" element={<Error401 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;