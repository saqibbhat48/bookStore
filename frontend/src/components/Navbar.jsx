import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const cart = useSelector((state) => state.cart.cart);

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: `Cart (${cart.length})`, link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
  ];

  // Filter links based on login status and role
  const filteredLinks = links.filter((item, index) => {
    if (!isLoggedIn) return index < 2; // Show only Home and All Books for non-logged-in users
    if (role === "user") return index !== 4; // Hide Admin Profile for users
    if (role === "admin") return index !== 3 && index !==2; // Hide Profile and cart for admins
    return true;
  });

  return (
    <nav className="bg-slate-800 backdrop-blur-sm border-b border-gray-700/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-2xl font-semibold text-white hover:text-blue-400 transition-all duration-300"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                alt="logo"
                className="h-10 mr-4"
              />
              BookHeaven
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {filteredLinks.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`text-slate-300 hover:text-white transition-all duration-300 ${
                  item.title.includes("Profile") || item.title.includes("Cart")
                    ? "px-4 py-2 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
                    : ""
                }`}
              >
                {item.title}
              </Link>
            ))}
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-blue-500 rounded-lg text-white hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  LogIn
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all duration-300"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="text-gray-300 hover:text-blue-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileNavOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <div className="md:hidden bg-gray-800/50 backdrop-blur-sm border-t border-gray-700/30">
          <div className="px-4 py-2 flex flex-col items-center space-y-4">
            {filteredLinks.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`text-white hover:text-blue-400 transition-all duration-300 ${
                  item.title.includes("Profile") || item.title.includes("Cart")
                    ? "px-4 py-2 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
                    : ""
                }`}
                onClick={() => setIsMobileNavOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-blue-500 rounded-lg text-white hover:bg-blue-500 hover:text-white transition-all duration-300"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  LogIn
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all duration-300"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;