import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!data.username || !data.password) {
        toast.error("All fields are required");
        return;
      }

      const response = await axiosInstance.post("/login", data);
      setData({ username: "", password: "" });
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem("id", response.data._id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      toast.success("Logged in successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      {/* Admin Credentials Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-lg border border-gray-700/30">
        <h2 className="text-lg font-semibold text-white mb-2">Admin Credentials</h2>
        <div className="text-gray-300">
          <p>Username: <span className="font-mono">admin</span></p>
          <p>Password: <span className="font-mono">admin123</span></p>
        </div>
        <p className="text-sm text-yellow-400 mt-2">To buy books, sign up and log in.</p>
      </div>

      {/* Login Form */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/30 p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={data.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700/50"></div>
          <span className="mx-4 text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-700/50"></div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-400 transition-all duration-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;