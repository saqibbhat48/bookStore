import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";

const BookCard = ({ image, title, author, price, bookid, fav }) => {
  const headers = {
    bookid: bookid,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const removeFromFavourite = async () => {
    try {
      const response = await axiosInstance.put(
        "/remove-from-favourite",
        {},
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="w-full bg-slate-800 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-950/30">
      <Link to={`/view-book-details/${bookid}`} className="block p-2 rounded-md">
        {/* Book Image */}
        <div className="w-full h-48 flex items-center rounded-md justify-center bg-gray-900">
          <img
            src={image}
            alt="book"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Book Details */}
        <div className="p-4">
          <h1 className="text-xl font-bold text-white truncate">{title}</h1>
          <p className="mt-2 text-gray-400 font-medium">by {author}</p>
          <p className="mt-2 text-lg font-semibold text-yellow-100">₹ {price}</p>
        </div>
      </Link>

      {/* Remove from Favourites Button */}
      {fav && (
        <button
          className="w-full mt-4 px-4 py-2 bg-red-500/10 text-red-500 font-semibold rounded-b-lg hover:bg-red-500/20 transition-all duration-300"
          onClick={removeFromFavourite}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;