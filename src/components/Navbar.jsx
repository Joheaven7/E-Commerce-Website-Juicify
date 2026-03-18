import React, { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");
  const { itemCount } = useCart();
  const { user, logout, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Home", href: "/", hash: "" },
    { name: "About", href: "/", hash: "about" },
    { name: "Products", href: "/", hash: "products" },
    { name: "Contact Us", href: "/", hash: "contact" },
  ];

  // Show welcome message when user logs in
  useEffect(() => {
    if (user) {
      setShowWelcome(true);
      setWelcomeName(user.name);
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    if (location.pathname === "/") {
      if (location.hash === "#about") {
        setActiveLink("About");
      } else if (location.hash === "#contact") {
        setActiveLink("Contact Us");
      } else if (location.hash === "#products") {
        setActiveLink("Products");
      } else {
        setActiveLink("Home");
      }
    } else if (location.pathname === "/products") {
      setActiveLink("Products");
    } else if (location.pathname === "/cart") {
      setActiveLink("");
    }
  }, [location]);

  const handleNavigation = (e, link) => {
    e.preventDefault();

    if (link.hash && link.hash !== "") {
      if (location.pathname === "/") {
        const section = document.getElementById(link.hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          navigate(`#${link.hash}`, { replace: true });
        }
      } else {
        navigate(`/#${link.hash}`);
      }
    } else {
      // ✅ FIX HOME SCROLL
      if (location.pathname === "/") {
        const section = document.getElementById("home");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          navigate("#home", { replace: true });
        }
      } else {
        navigate("/#home");
      }
    }

    setActiveLink(link.name);
    setSideBarOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-50 font-normal backdrop-blur-md bg-gray-50 text-black">
        {/* Logo */}
        <Link

          className="font-bold cursor-pointer"
          to="/"
          onClick={() => setActiveLink("Home")}
        >
          <div>
            🍊 <sup>🍃</sup>
          </div>
          <div className="text-black-900">
            JUI<span className="text-orange-500">CIFY</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex flex-row items-center gap-6 sm:text-sm font-normal text-black">
          {links.map((link, index) => (
            <button
              key={index}
              onClick={(e) => handleNavigation(e, link)}
              className={`py-2 whitespace-nowrap relative cursor-pointer
                after:content-[''] after:absolute after:left-0 after:bottom-0 
                after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300
                ${activeLink === link.name
                  ? "after:w-full"
                  : "after:w-0 hover:after:w-full"
                }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Welcome Message */}
          {showWelcome && (
            <div className="hidden sm:block bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium animate-fadeIn">
              👋 Welcome back, {welcomeName}!
            </div>
          )}

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative hover:text-orange-500 transition-colors"
          >
            <span className="text-2xl">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                {itemCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700 hidden sm:inline">
              </span>
              <button
                onClick={logout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm font-normal transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Login/Signup */}
              <div className="hidden lg:flex items-center gap-3">
                <button
                  onClick={() => openAuthModal('login')}
                  className="bg-amber-600 text-white px-5 py-2 rounded-xl cursor-pointer hover:bg-amber-500 transition-all font-normal text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="bg-amber-600 text-white px-5 py-2 rounded-xl cursor-pointer hover:bg-amber-500 transition-all font-normal text-sm"
                >
                  Sign Up
                </button>
              </div>

              {/* Tablet Sign Up */}
              <button
                onClick={() => openAuthModal('signup')}
                className="hidden sm:block lg:hidden bg-amber-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-amber-500 transition-all font-normal text-sm"
              >
                Sign Up
              </button>
            </>
          )}

          {/* Mobile Sign Up button */}
          {!user && (
            <button
              onClick={() => openAuthModal('signup')}
              className="sm:hidden bg-amber-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-amber-500 transition-all font-normal text-sm"
            >
              Sign Up
            </button>
          )}

          {/* Mobile Menu Button */}
          <HiMenu
            onClick={() => setSideBarOpen(true)}
            className="w-6 h-6 sm:hidden cursor-pointer hover:text-orange-500 transition-colors"
          />
        </div>
      </div>

      {/* Mobile Sidebar - Slides from right */}
      <div
        className={`fixed inset-0 z-50 sm:hidden transition-all duration-300 ${sideBarOpen ? 'visible' : 'invisible'
          }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${sideBarOpen ? 'opacity-50' : 'opacity-0'
            }`}
          onClick={() => setSideBarOpen(false)}
        />

        {/* Sidebar - from right */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${sideBarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="relative h-full p-6 overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSideBarOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition"
            >
              <IoClose className="text-2xl" />
            </button>

            {/* Logo in Sidebar */}
            <div className="text-center mb-8 mt-8">
              <div className="text-3xl">
                🍊 <sup>🍃</sup>
              </div>
              <div className="text-xl text-gray-900">
                JUI<span className="text-orange-500">CIFY</span>
              </div>
              {user && (
                <p className="text-sm text-gray-600 mt-2">Hi, {user.name}</p>
              )}
            </div>

            {/* Mobile Welcome Message */}
            {showWelcome && (
              <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-lg text-sm text-center animate-fadeIn">
                👋 Welcome back, {welcomeName}!
              </div>
            )}

            {/* Navigation Links */}
            <div className="flex flex-col space-y-2 mb-6">
              {links.map((link, index) => (
                <button
                  key={index}
                  onClick={(e) => handleNavigation(e, link)}
                  className={`text-left py-3 px-4 w-full rounded-lg transition ${activeLink === link.name
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                    }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setSideBarOpen(false);
                  }}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl cursor-pointer hover:bg-gray-300 transition-all font-normal"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      openAuthModal('login');
                      setSideBarOpen(false);
                    }}
                    className="w-full border border-amber-600 text-amber-600 py-3 rounded-xl cursor-pointer hover:bg-amber-50 transition-all font-normal"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      openAuthModal('signup');
                      setSideBarOpen(false);
                    }}
                    className="w-full bg-amber-600 text-white py-3 rounded-xl cursor-pointer hover:bg-amber-500 transition-all font-normal"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal />
    </>
  );
};

export default Navbar;