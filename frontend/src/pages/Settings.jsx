import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const Settings = () => {
  const [profileData, setProfileData] = useState(null);
  const [values, setValues] = useState({ address: "" });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get("/getUserData", { headers });
        setProfileData(response.data);
        setValues({ address: response.data.address });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleUpdateAddress = async () => {
    if(!values.address) return toast.error("Address can't be empty")
    try {
      const response = await axiosInstance.put("/update-user-address", values, { headers });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 sm:px-8 py-8">
      {!profileData && <Loader />}
      {profileData && (
        <div className="text-gray-100">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-500 mb-8">
            Settings
          </h1>

          {/* Username and Email Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg text-gray-100">
                {profileData.username}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg text-gray-100">
                {profileData.email}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="mb-8">
            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows="5"
              className="w-full p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Update Button */}
          <div className="flex justify-end">
            <button
              onClick={handleUpdateAddress}
              className="px-6 py-3 bg-yellow-500 text-gray-950 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;