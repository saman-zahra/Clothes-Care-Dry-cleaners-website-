/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Col, Input, Button, Row } from "antd";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { firebaseConfig } from "../../firebaseConfig";
import { sendEmail } from "../../utills/emailSend";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/action";

const { TextArea } = Input;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ContactUs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [totalPrice, setTotalPrice] = useState();
  const [address, setAddress] = useState("");
  const [orderDetails, setOrderDetails] = useState("");
  const cartItems = useSelector((state) => state.cartItems);
  console.log(cartItems);
  useEffect(() => {
    if (cartItems.length > 0) {
      calculateTotalPrice();
    }
  }, [cartItems]);

  const calculateTotalPrice = () => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce((acc, item) => acc + item.price, 0);
      const formattedTotal = total.toFixed(2); // Round to 2 decimal places
      setTotalPrice(formattedTotal);
    } else {
      setTotalPrice("");
    }
  };
  const handleSubmit = async () => {
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      Swal.fire({
        icon: "error",
        title: "Invalid email",
        text: "Please enter a valid email address",
      });
      return;
    }

    if (orderDetails.length < 10) {
      Swal.fire({
        icon: "error",
        title: "Insufficient order details",
        text: "Please provide at least 10 characters",
      });
      return;
    }

    try {
      // Construct service names string separated by commas
      const serviceNames = cartItems.map((item) => item.name).join(", ");

      const docRef = await addDoc(collection(db, "Orders"), {
        name,
        phone,
        email,
        address,
        orderDetails,
        serviceNames: serviceNames || "", // Add service names to the document or an empty string
        totalPrice: totalPrice !== "0.00" ? totalPrice : null, // Add total price to the document or null if it's "0.00"
        status: "Pending", //,
        submittedAt: serverTimestamp(),
      });
      await sendEmail(name, email, orderDetails, docRef.id);
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setOrderDetails("");
      Swal.fire({
        icon: "success",
        iconColor: "#0890F3",
        title: "Success!",
        text: "Order details are submitted.",
      });
      dispatch(clearCart()); // Clear cart state
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  const handleNavigateToServices = () => {
    dispatch(clearCart()); // Clear cart state
    navigate("/Services");
  };

  return (
    <div>
      <div className=" bg-[#0890F3] py-14 ">
        <div className="flex justify-center">
          <i className="text_lato text-4xl font-semibold text-center text-white">
            Contact US / Order Details 
          </i>
        </div>
      </div>

      <Row className="my-10">
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="px-16 py-3"
        >
          <div className=" mb-10">
            <h1 className="text_lato text-5xl font-bold">
              Clothes Care <br />
              <span className="text-[#0890F3]">Dry Cleaner</span>
            </h1>
            <div className="mt-10">
              <p className="text-base text_lato font-semibold my-2">
                Do not hesitate to contact us directly. We will respond to you
                as soon as possible.{" "}
                <span className="text-[#0890F3]">
                  You will be amazed by our solutions!
                </span>
              </p>
            </div>
          </div>
          <div className="mb-10">
            <p className="text-base mt-2">
              Phone :{" "}
              <span className="font-semibold text-[red]">020 7736 6688</span>
            </p>
            <address className="text-base text_lato ">
              Address : 688 Fulham Rd., London SW6 5SA, United Kingdom
            </address>
          </div>
          <div className="mb-10">
            <h1 className="my-2 text-2xl text_lato font-semibold">
              OPENING TIMES:
            </h1>
            <p className="text-base text_lato font-medium">
              Mon-Fri : <span className="font-semibold">8am - 7pm</span>
            </p>
            <p className="text-base text_lato font-medium">
              Sat : <span className="font-semibold">8am - 6pm</span>
            </p>
            <p className="text-base text_lato font-medium">
              Sun : <span className="font-semibold"> 10am - 4pm</span>
            </p>
          </div>
          <p className="text-base text_lato font-semibold my-2">
            Note:
            <span className="text-[red] ml-2">
              Prior to placing your order, kindly verify our operating hours for
              the week, as mentioned above.
            </span>
          </p>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="px-16 py-3"
        >
          <h1 className="text_lato text-3xl font-semibold mb-3">
            Kindly ensure all fields are accurately filled with valid
            information
          </h1>
          <label className="text-base font-semibold ">
            Name<span style={{ color: "red" }}>*</span>
          </label>
          <Input
            placeholder="Name"
            type="text"
            size={"large"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-base font-semibold mt-2">
            Phone<span style={{ color: "red" }}>*</span>
          </label>
          <Input
            placeholder="Phone Number"
            type="phone"
            size={"large"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label className="text-base font-semibold mt-2">
            Email<span style={{ color: "red" }}>*</span>
          </label>
          <Input
            placeholder="Email"
            type="email"
            size={"large"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-base font-semibold mt-2">
            Address<span style={{ color: "red" }}>*</span>
          </label>
          <Input
            placeholder="Address"
            type="text"
            size={"large"}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {cartItems.length > 0 && (
            <div>
              <label className="text-base font-semibold mt-2">
                Selected Services:
              </label>
              <TextArea
                value={cartItems.map((item) => item.name).join(", ")}
                disabled
              />
            </div>
          )}

          {cartItems.length > 0 && (
            <div>
              <label className="text-base font-semibold mt-2">
                Total Price: £
              </label>
              <Input value={totalPrice} disabled />
            </div>
          )}

          <label className="text-base font-semibold mt-2">
            Order Details<span style={{ color: "red" }}>*</span>
          </label>
          <TextArea
            placeholder="Order Details"
            allowClear
            rows={4}
            value={orderDetails}
            onChange={(e) => setOrderDetails(e.target.value)}
          />

          <div className="flex gap-3 items-center">
            {cartItems.length > 0 && (
              <div className="text-center">
                <Button
                  size="large"
                  className="block px-6  mt-2 rounded-lg bg-gradient-to-r from-sky-600 to-cyan-400 text-center text-white"
                  onClick={handleNavigateToServices}
                >
                  Change Services
                </Button>
              </div>
            )}
            <Button
              size="large"
              className="block px-6  mt-2 rounded-lg bg-gradient-to-r from-sky-600 to-cyan-400 text-center text-white"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ContactUs;
