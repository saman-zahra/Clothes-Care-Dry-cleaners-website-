import React from "react";
import serviceAnimation from "./serviceAnimation.json";
import Lottie from "react-lottie";

const ServiceAnimationLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: serviceAnimation, // Lottie animation JSON
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
    </div>
  );
};
export default ServiceAnimationLottie;
