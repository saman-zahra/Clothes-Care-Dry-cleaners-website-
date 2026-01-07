/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Button, Col, Row } from "antd";
import WashImage from "../../images/wash_big.png";
import DryCleaning from "../../images/dry_cleaning_big.png";
import WashIron from "../../images/wash_and_iron_big.png";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import LottieComponent from "../lottie/LottieComponent";
import ServiceAnimationLottie from "../lottie/ServiceAnimationLottie";
import HourServiceLottie from "../lottie/HourServiceLottie";
import Reviews from "./Reviews";
const { Meta } = Card;

const Home = () => {
  const Navigate = useNavigate();
  const navigateToServices = () => {
    Navigate("/Services");
  };
  const services = [
    {
      image: WashImage,
      alt: "no image found",
      title: "Service Wash",
      description:
        "Convenient laundry service, providing clean clothes without the hassle of washing and drying.",
    },
    {
      image: DryCleaning,
      alt: "no image found",
      title: "Dry Cleaning",
      description:
        "Professional care for delicate fabrics, ensuring garments receive meticulous cleaning and attention to detail.",
    },
    {
      image: WashIron,
      alt: "no image found",
      title: "Shirts Service",
      description:
        "Tailored cleaning process for shirts, maintaining quality, crispness, and professional appearance.",
    },
  ];

  return (
    <div>
      {/* Header */}
      <header className="flex justify-center items-center p-5 bg-[#0890F3] lg:pt-0">
        <div className="container flex justify-center">
          <Row gutter={24} className="items-center">
            <Col sm={24} md={24} lg={12}>
              <div className="text-white text-center text_lato text-xl md:text-4xl lg:text-6xl font-semibold lg:mt-20 sm:mt-4 md:mt-4">
                Laundry & dry <br /> cleaning with 24h <br /> delivery in
                <br />
                <span className="font-semibold text-[#FFD06D]">London</span>
              </div>
            </Col>
            <Col sm={24} md={24} lg={12} className="hidden md:block">
              <LottieComponent />
            </Col>
          </Row>
        </div>
      </header>

      {/* Header End*/}

      <section className="text-center my-12">
        {/* Services */}

        <div className="my-5">
            <Button type="danger"  onClick={() => Navigate("/contact")} size="large" className="rounded-lg bg-gradient-to-r from-red-400 to-red-600 text-center text-white">
              Contact Us
            </Button>
            <Button type="primary" onClick={() => Navigate("/Services")} size="large" className="rounded-lg ml-2 bg-gradient-to-r from-sky-400 to-cyan-600 text-center text-white">
              Avail Our Services
            </Button>
          </div>
        <div className="flex justify-center">
          <i className="text_lato lg:text-4xl md:text-xl sm:text-5xl font-bold">
            We collect, clean, and deliver
            <br /> your laundry and dry cleaning.
          </i>
        </div>

        <Row className="mt-6 below_header">
          <Col sm={8} md={8} lg={8}>
            <div className="flex items-center justify-center mt-3">
              <img
                src="https://prod-cdn.laundryheap.com/assets/landing/icons/24-3435ffaf292eb948ff83ca5e64dabec878e0c27316dec67b632cbf492e34f97e.svg"
                alt="Logo"
              />
              <span className="text_lato font-bold lg:text-xl ml-4 ">
                24h turnaround time
              </span>
            </div>
          </Col>
          <Col sm={8} md={8} lg={8}>
            <div className="flex items-center justify-center mt-3">
              <img
                src="https://prod-cdn.laundryheap.com/assets/landing/icons/truck-714a3cd6450430a204a46d86196df6dd97b711709c9852df248c930c52ebfe49.svg"
                alt="Logo"
              />
              <span className="text_lato font-bold lg:text-xl ml-4">
                Free collection and delivery
              </span>
            </div>
          </Col>
          <Col sm={8} md={8} lg={8}>
            <div className="flex items-center justify-center mt-3">
              <img
                src="https://prod-cdn.laundryheap.com/assets/landing/icons/chat-ecb700cb9b10e2d9668526900e47d154e28ef3b6a82dd4b0989b86cf1167ad76.svg"
                alt="Logo"
              />
              <span className="text_lato font-bold lg:text-xl ml-4">
                Dedicated 24/7 support
              </span>
            </div>
          </Col>
        </Row>

        {/* Services end */}

        {/*  how it works portion */}

        <Row className="items-center text-start mt-4">
          <Col sm={24} md={24} lg={12} className="px-20 mt-3">
            <ServiceAnimationLottie />
          </Col>
          <Col sm={24} md={24} lg={12} className="px-20 mt-2">
            <p className="text-[grey] text-base mb-3 font-bold text_lato">
              FREEDOM FROM LAUNDRY
            </p>
            <h1 className="text_lato font-bold text-4xl mb-3">
              A laundry service designed for you
            </h1>
            <p className="text-lg mb-3 text_lato font-normal">
              Never worry about staining your favourite shirt. We offer laundry,
              dry cleaning and ironing in London at a schedule that fits your
              lifestyle.
            </p>
          </Col>
        </Row>
        <Row className="items-center text-start custom_direction">
          <Col sm={24} md={24} lg={12} className="px-20 mt-2">
            <p className="text-[grey] text-base mb-3 font-bold text_lato">
              24H TURNAROUND TIME
            </p>
            <h1 className="text_lato font-bold text-4xl mb-3">
              No need to plan in advance
            </h1>
            <div className="flex items-center mt-2">
              <img
                alt="no image found"
                src="https://prod-cdn.laundryheap.com/assets/landing/benefits/bag-4ce09f20854869392ff759b2698a6890b263730052076f348f7d5b12e357514a.svg"
              />
              <span className="text_lato font-bold lg:text-xl ml-4 ">
                Schedule a collection today
              </span>
            </div>
            <div className="flex items-center mt-3">
              <img
                alt="no image found"
                src="https://prod-cdn.laundryheap.com/assets/landing/benefits/24-3dda1cab62308588e1c24a7e2101e5cc182f9dd21bf47a280056a3a0e6d0192d.svg"
              />
              <span className="text_lato font-bold lg:text-xl ml-4 ">
                Get your laundry back in 24h
              </span>
            </div>

            {/* <p className="text-[#0890F3]">See How its Works ?</p> */}
          </Col>
          <Col sm={24} md={24} lg={12} className="px-20 mt-2">
            <HourServiceLottie />
          </Col>
        </Row>

        {/*  how it works portion End */}

        {/* Pricing Cards */}
        <div>
          <div className="flex justify-center my-10">
            <i className="text_lato text-3xl font-semibold text-center headings">
              Our Services
            </i>
          </div>

          <Row className="items-center text-start">
            {services.map((service, index) => (
              <Col key={index} sm={24} md={24} lg={8} className="px-10">
                <Card hoverable className="service_card_content mt-3">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-1/2"
                  />
                  <p className="text-2xl font-medium my-4">{service.title}</p>
                  <Meta description={service.description} />
                </Card>
              </Col>
            ))}
          </Row>

          <Button
            type="primary"
            className="bg-[#0890F3] mt-5 rounded-2xl"
            size="large"
            onClick={() => navigateToServices()}
          >
            Explore More
          </Button>
        </div>
        {/* Pricing Cards */}
        <Reviews />
      </section>
    </div>
  );
};

export default Home;
