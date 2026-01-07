import React from "react";
import hourService from "./HourService.json";
import Lottie from "react-lottie";

const HourServiceLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: hourService, // Lottie animation JSON
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

export default HourServiceLottie;
