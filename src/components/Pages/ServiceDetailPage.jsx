import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { List, Row, Col, Button, message,  Spin } from "antd";
import { RollbackOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/action";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import {
  collection,
  getFirestore,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ServicesDetail = () => {
  const [subServices, setSubServices] = useState([]);
  const { id } = useParams();
  const { name } = useParams();
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchSubServices = () => {
      const q = query(
        collection(db, "SubServices"),
        where("serviceId", "==", id)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const subServicesData = [];
        querySnapshot.forEach((doc) => {
          subServicesData.push({ ...doc.data(), id: doc.id });
        });
        setSubServices(subServicesData);
        setLoading(false); // Set loading to false when data is fetched
      });
      return unsubscribe;
    };

    const unsubscribe = fetchSubServices();
    return () => unsubscribe();
  }, [id]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const navigate = useNavigate();

  const handleAddToCart = (service) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === service.id);
    if (!isAlreadyInCart) {
      dispatch(addToCart(service));
      message.success(`${service.name} service added to cart`);
    } else {
      message.warning(`${service.name} service is already in the cart`);
    }
  };

  const handleRemoveFromCart = (service) => {
    dispatch(removeFromCart(service));
    message.success(`${service.name} removed from cart`);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.price), 0);
  };

  return (
    <>
      {loading ? (
        <div className="text-center py-4">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="bg-[#0890F3] py-14">
            <div>
              <h1 className="text-center text-5xl font-semibold text_lato text-white">
             {name}
              </h1>
            </div>
          </div>
          <div className="px-10 flex justify-end">
            <Button
              type="danger"
              className="mt-4 bg-[red] py-1 px-4 text-white flex items-center justify-center"
            >
              <RollbackOutlined /> Go back
            </Button>
          </div>
          <Row>
            <Col sm={24} md={24} lg={12}>
              <div className="px-10 my-10 h-screen overflow-auto">
                <List
                  dataSource={subServices}
                  grid={{ gutter: 16, column: 1 }}
                  renderItem={(subService, index) => (
                    <div className="subServicesMain">
                      <List.Item key={index}>
                        <div className="flex justify-between">
                          <div className="servicesCards">
                            <h3 className="text-lg text_lato font-bold">
                              {subService.name}
                            </h3>
                            <p className="text-lg text_lato font-bold mt-2">
                              <span className="text-[red]">
                                Per Item Price:
                              </span>{" "}
                              {`${subService.price}£`}
                            </p>
                          </div>
                          <Button
                            type="primary"
                            className="mt-4 bg-[#0890F3]"
                            onClick={() => handleAddToCart(subService)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </List.Item>
                    </div>
                  )}
                />
              </div>
            </Col>
            <Col sm={24} md={24} lg={12}>
              <div className="p-10 h-screen overflow-auto">
                <h2 className="text-2xl font-bold text_lato mb-4">
                  Service Cart ({cartItems.length} items)
                </h2>
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between mb-2 subServicesMain"
                  >
                    <div className="text-base font-semibold">
                      {item.name} -{" "}
                      <span className="text-[red]"> {item.price}£ </span>
                    </div>
                    <Button
                      type="danger"
                      onClick={() => handleRemoveFromCart(item)}
                      className="text-[red] text-base flex items-center"
                    >
                      <DeleteOutlined /> Remove
                    </Button>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <div className="text-[red] text-2xl font-bold">
                    Total: {calculateTotal()}£
                  </div>
                  <Button
                    type="primary"
                    className="mt-4 bg-[#0890F3]"
                    onClick={() => navigate("/contact")}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ServicesDetail;
