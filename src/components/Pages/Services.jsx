/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Spin } from "antd"; // Import Spin component for loader
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { firebaseConfig } from "../../firebaseConfig";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import ServicesImage from "../../images/services.jpg";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const { Meta } = Card;

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const navigate = useNavigate();
  console.log(services)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Service"), (snapshot) => {
      const servicesData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setServices(servicesData);
      setLoading(false); // Set loading to false when data is fetched
    });

    // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      {loading ? ( // Display loader if loading is true
        <div className="text-center py-4">
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <div className="bg-[#0890F3] py-14 ">
            <div className="flex justify-center">
              <i className="text_lato text-4xl font-semibold text-center text-white">
                Our Services
              </i>
            </div>
          </div>

          <div className="my-10">
            <Row>
              <Col xs={24} sm={24} md={12} className="px-10">
                <img src={ServicesImage} className="rounded-lg" alt="no image found" />
              </Col>
              <Col xs={24} sm={24} md={12} className="px-3 services_text">
                <i className="text-xl font-medium">
                  At
                  <span className="text-[#0890F3] text-bold ml-2 font-bold text-justify">
                    Clothes Care Dry Cleaners
                  </span>
                  , we pride ourselves on offering a comprehensive suite of
                  laundry services tailored to meet your needs. From our
                  convenient wash and fold service, perfect for busy individuals
                  seeking a hassle-free laundry solution, to our meticulous dry
                  cleaning service, ideal for delicate fabrics requiring special
                  care, we are dedicated to delivering exceptional results every
                  time. Our professional pressing and ironing service ensures
                  your garments are impeccably crisp and ready to wear, while
                  our specialty cleaning options cater to a wide range of unique
                  items, from wedding gowns to leather jackets. With convenient
                  pickup and delivery services, as well as commercial laundry
                  solutions for businesses, we strive to make the laundry
                  process as seamless and stress-free as possible for our valued
                  customers. Contact us today to experience the difference our
                  quality service can make for you.
                </i>
              </Col>
            </Row>
          </div>

          <div className="flex justify-center items-center px-10 my-10">
            <Row gutter={[8, 16]}>
              {services.map((service, index) => (
                <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8} key={index}>
                  <Card 
                  className="min-h-[446px]"
                   cover={
                    <img
                      src={service.img}
                    className=" h-[250px] rounded-xl object-fill  "
                    />
                  }
                  >
                    <Meta
                      className="servicesCards"
                      
                      title={service.name}
                      description={service.description}
                    />
                    {service.description && ( // Check if ServiceDetail is present
                      <Button
                        type="primary"
                        className="mt-4 bg-[#0890F3]"
                        onClick={() =>
                          navigate(
                            `/ServiceDetail/${service.id}/${service.name}`
                          )
                        }
                      >
                        <div className="flex gap-2">
                          <EyeOutlined /> <span>Explore</span>
                        </div>
                      </Button>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
