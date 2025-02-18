import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-[89vh] bg-gradient-to-br from-gray-900 to-gray-800 w-full flex flex-col lg:flex-row items-center justify-center px-6 sm:px-12 py-12 lg:py-0">
      {/* Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
        <h1 className="text-5xl sm:text-6xl font-bold text-yellow-100 leading-tight">
          Discover Your Next Great Read
        </h1>
        <p className="text-lg sm:text-xl text-gray-300">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books.
        </p>
        <Link
          to="/all-books"
          className="mt-6 px-8 py-3 text-xl font-semibold text-white bg-transparent border-2 border-yellow-100 rounded-full hover:bg-yellow-100 hover:text-gray-900 transition-all duration-300"
        >
          Discover Books
        </Link>
      </div>

      {/* Image Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center mt-10 lg:mt-0">
        <img
          src="/hero.png"
          alt="hero"
          className="w-full max-w-lg lg:max-w-none h-auto lg:h-[80vh] object-cover rounded-lg "
        />
      </div>
    </div>
  );
};

export default Hero;