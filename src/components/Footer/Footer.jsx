import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png"
const Footer = () => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9940.36941073441!2d-0.2066253!3d51.4748191!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760f9e6604375d%3A0x5512395fa3ec46d8!2sclothes%20care%20dry%20cleaner!5e0!3m2!1sen!2s!4v1710531076199!5m2!1sen!2s"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
      <footer className="bg-[#0890F3] text-white px-6 py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              <Link to="/">
                <img

                  src={Logo}
                  alt="logo-tailus"
                  className="w-1/2"
                />
              </Link>
            </h3>
            <p className="text-base">
              "Exceptional cloth washing and laundry service. Expert care,
              eco-friendly products. Convenience guaranteed. Experience
              freshness and quality with every garment."
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-base space-y-2">
              <li>
                <Link to="/" target="_self">Home</Link>
              </li>
              <li>
                <Link to="/Services" target="_self">Prices & Services</Link>
              </li>
              <li>
                <Link to="/contact" target="_self">Contact us</Link>
              </li>
              <li>
                <Link to="/howitworks" target="_self">How it works</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-2 text-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/clothes_care_drycleaners/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="border-t border-white-700 mt-8 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} Clothes Care Dry Cleaner. All Rights
          Reserved
        </div>
      </footer>
    </div>
  );
};

export default Footer;
