import React from "react";
import { Row, Col } from "antd";

// Define the Review component
const Review = ({ review }) => {
  return (
    <div className="review">
      <i className="text-xl font-normal text_lato">{review.content}</i>
      <br />
      <i className="text-2xl font-bold text_lato text-[#0890F3] my-3">
        {review.author}
      </i>
    </div>
  );
};

// Static review data
const reviewsData = [
  {
    author: "John Doe",
    content:
      "Efficient and reliable! This laundry service consistently exceeds expectations. From their seamless online booking system to the flawless cleaning process, every step is handled with precision and care. I'm continually impressed by their commitment to delivering excellence. Without hesitation, I recommend them to anyone in need of superior laundry solutions.",
  },
  {
    author: "Jane Smith",
    content:
      "Impeccable service! From the moment I dropped off my clothes, I was impressed. Not only were my garments cleaned to perfection, but the staff's professionalism and attention to detail were exceptional. I highly recommend this laundry service to anyone looking for quality care and outstanding results.",
  },
  {
    author: "Alice Johnson",
    content:
      "Celestial service! Entrusting my garments to this laundry service was akin to sending them on a rejuvenating vacation. Not only were they returned immaculately clean, but the meticulous attention to stains and fabric care was evident. Their courteous staff and prompt delivery make them an unparalleled choice for laundry aficionados.",
  },
];

// Define the App component
const Reviews = () => {
  return (
    <div>
      <div className="flex justify-center my-2">
        <i className="font_lato text-3xl font-bold headings ">
          Customer Reviews
        </i>
      </div>

      <Row>
        {reviewsData.map((review, index) => (
          <Col key={index} xs={24} sm={12} lg={8} className="px-3 py-4">
            <Review review={review} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Reviews;
