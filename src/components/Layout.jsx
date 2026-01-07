// Layout.js

import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import AppRoutes from "./routes/Approutes";


const Layout = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
};

export default Layout;
