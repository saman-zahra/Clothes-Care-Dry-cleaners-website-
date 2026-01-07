/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Row, Col, Button } from "antd";
import ServicesImage from "../../images/howworks.jpg";
import first from "../../images/one.jpg";
import { useNavigate } from "react-router-dom";

const HowItWork = () => {
  const Navigate = useNavigate();

  const handleNavigate = () => {
    Navigate("/Services");
  };
  return (
    <div>
      <Row className="items-center my-8">
        <Col xs={24} sm={24} md={12} className="px-20">
          <i className="text-4xl font-bold">
            <span className="text-[#0890F3] text-bold ml-2 mr-2 font-bold text-justify">
              Clothes Care Dry Cleaners
            </span>
            provides you best cleaning services in{" "}
            <span className="font-semibold text-[#FFD06D]">London</span>
          </i>
        </Col>
        <Col xs={24} sm={24} md={12} className="px-20 mt-2">
          <img src={ServicesImage} alt="no image found" />
        </Col>
      </Row>

      <div className="flex justify-center my-10">
        <i className="text_lato text-3xl font-semibold text-center headings">
          How it works
        </i>
      </div>
      <Row className="items-center mb-4">
        <Col sm={24} md={24} lg={12} className="px-20 my-3">
          <img src={first} alt="no image found" className="rounded-2xl" />
        </Col>
        <Col sm={24} md={24} lg={12} className="px-20 my-3">
          <ul className="list-disc italic">
            <li className="font-bold text-2xl">
              Explore which Service you want to
              <span className="text-[#0890F3] ml-1">avail</span>.
            </li>
            <li className="font-bold text-2xl">
              Book your <span className="text-[#0890F3]">Desire</span> Service.
            </li>
            <li className="font-bold text-2xl">Checkout</li>
            <li className="font-bold text-2xl">
              Submit the <span className="text-[#0890F3]">Details</span>
            </li>
          </ul>

          <br />
          <Button className="text-[#0890F3] mt-1" onClick={handleNavigate}>
            Click here
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default HowItWork;
