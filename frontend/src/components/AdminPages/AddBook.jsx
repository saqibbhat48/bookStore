import React, { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";

const AddBook = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !data.url ||
        !data.title ||
        !data.author ||
        !data.price ||
        !data.desc ||
        !data.language
      ) {
        toast.error("All fields are required!");
        return;
      }

      const response = await axiosInstance.post("/add-book", data, { headers });
      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 sm:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-500 mb-8">
        Add Book
      </h1>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6">
        {/* Image URL */}
        <div className="mb-6">
          <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={data.url}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Author */}
        <div className="mb-6">
          <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={data.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Language and Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
              Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={data.language}
              onChange={handleChange}
              placeholder="Enter book language"
              className="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={data.price}
              onChange={handleChange}
              placeholder="Enter book price"
              className="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="desc" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={data.desc}
            onChange={handleChange}
            placeholder="Enter book description"
            rows="5"
            className="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;