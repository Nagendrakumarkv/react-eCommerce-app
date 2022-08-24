import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const isAdmin = useSelector((state) => state.user.currentUser.isAdmin);

  return (
    <>
      <Router>
        <ToastContainer position="top-center" autoClose="3000" />
        {isAdmin ? <Topbar /> : null}
        <div className="container">
          {isAdmin ? <Sidebar /> : null}
          <Routes>
            <Route path="/" element={isAdmin ? <Home /> : <Login />} />
            <Route
              path="/login"
              element={isAdmin ? <Navigate to="/" /> : <Login />}
            />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newProduct" element={<NewProduct />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
