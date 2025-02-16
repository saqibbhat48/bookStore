import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllBooks from "./pages/AllBooks";
import ViewBookDetails from "./pages/ViewBookDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Favourite from "./pages/Favourite";
import OrderHistory from "./pages/OrderHistory";
import Settings from "./pages/Settings";
import AllOrders from "./components/AdminPages/AllOrders";
import AddBook from "./components/AdminPages/AddBook";
import UpdateBooks from "./components/AdminPages/UpdateBooks";
import { authActions } from "./store/auth";
import { fetchCart } from "./store/cartActions";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Check localStorage for user authentication on initial render
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  useEffect(() => {
    if(!isLoggedIn) return
    dispatch(fetchCart())
  }, [isLoggedIn])
  

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />}>
            <Route
              index
              element={role !== "admin" ? <Favourite /> : <AllOrders />}
            />
            {role === "admin" && (
              <Route path="add-book" element={<AddBook />} />
            )}
            <Route path="orderHistory" element={<OrderHistory />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {role === "admin" && (
            <Route path="/update-book/:id" element={<UpdateBooks />} />
          )}
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;