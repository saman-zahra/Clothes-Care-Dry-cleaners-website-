/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {  useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";

function AdminSideNav() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
    
        navigate("/Login");
      };
  return (
    <div className={`sticky top-0 z-50 lg:relative lg:z-auto`}>
    <header>
      <div className="relative z-20  bg-[#0890F3]">
        <div className="px-6 md:px-12 lg:container lg:mx-auto lg:px-6 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="relative z-30">
              <a href="#">
              <img src={Logo} alt="logo-tailus" className="w-1/4" />
              </a>
            </div>
            <h1 className="text-2xl font-bold text-center text-white ">
              Admin Dashboard
            </h1>
            <div className="flex items-center justify-end  lg:border-l-0">
              <div>
                <div className="py-8 px-6 md:px-12 md:py-16 lg:border-t-0 lg:py-0 lg:pr-0 lg:pl-6 flex items-center gap-5">
                  <button
                    onClick={logout}
                    className="block px-6 py-3 rounded-lg bg-gradient-to-r from-sky-600 to-cyan-400 text-center text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
  )
}

export default AdminSideNav