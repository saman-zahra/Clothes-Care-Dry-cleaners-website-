import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sticky top-0 z-50 lg:relative lg:z-auto`}>
      <header>
        <div
          className={`relative z-20 bg-[#0890F3] ${
            isScrolled ? "shadow-md" : ""
          }`}
        >
          <div className="px-6 md:px-12 lg:container lg:mx-auto lg:px-6 lg:py-4">
            <div className="flex items-center justify-between">
              <div className="relative z-30">
                <Link to="/">
                  <img src={Logo} alt="logo-tailus" className="w-1/3" />
                </Link>
              </div>

              <div className="flex items-center justify-end lg:border-l-0">
                <div>
                  <Link
                    to="/contact"
                    className="flex text-nowrap md:block lg:hidden sm:block px-5 py-3 text-xs rounded-lg bg-gradient-to-r from-sky-600 to-cyan-400 text-white"
                  >
                    Book Now
                  </Link>
                </div>
                <input
                  type="checkbox"
                  name="hamburger"
                  id="hamburger"
                  className="peer"
                  hidden
                  checked={isOpen}
                  onChange={handleToggleMenu}
                />
                <label
                  htmlFor="hamburger"
                  className={`peer-checked:hamburger block relative z-30 p-6 -mr-6 cursor-pointer lg:hidden ${
                    isOpen ? "peer-checked:hamburger-close" : ""
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className={`m-auto h-0.5 w-6 rounded bg-sky-900 transition duration-300 ${
                      isOpen ? "opacity-0" : ""
                    }`}
                  ></div>
                  <div
                    aria-hidden="true"
                    className={`m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 transition duration-300 transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  ></div>
                  <div
                    aria-hidden="true"
                    className={`m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 transition duration-300 transform ${
                      isOpen ? "-rotate-45" : ""
                    }`}
                  ></div>
                </label>

                <div
                  className={`peer-checked:translate-y-0 fixed inset-0 h-screen w-screen translate-y-[-100%] border-b bg-[#0890F3] lg:border-b-0 lg:h-auto lg:w-auto lg:static lg:shadow-none lg:translate-y-0 z-20`}
                >
                  <div className="flex flex-col h-full justify-between lg:items-center lg:flex-row">
                    <ul className="px-6 pt-32 text-gray-700 space-y-8 md:px-12 lg:space-y-0 lg:flex lg:space-x-12 lg:pt-0 nav_listing">
                      <li>
                        <Link to="/" onClick={handleToggleMenu}>
                          <span className="text-white text_lato relative lg:text-base font-semibold">
                            Home
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/howitworks" onClick={handleToggleMenu}>
                          <span className="text-white text_lato relative lg:text-base font-semibold">
                            How it works
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/services" onClick={handleToggleMenu}>
                          <span className="text-white text_lato relative lg:text-base font-semibold">
                            Services
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" onClick={handleToggleMenu}>
                          <span className="text-white text_lato relative lg:text-base font-semibold">
                            Contact Us
                          </span>
                        </Link>
                      </li>
                    </ul>

                    <div className="py-8 px-6 md:px-12 md:py-16 lg:border-t-0 lg:py-0 lg:pr-0 lg:pl-6">
                      <Link
                        to="/contact"
                        onClick={handleToggleMenu}
                        className="block px-6 py-3 rounded-lg text-nowrap bg-gradient-to-r from-sky-600 to-cyan-400 text-center text-white"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
