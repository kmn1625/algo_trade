import React from "react";
import Slider from "react-slick";
import categoryImage from "../images/card_image.jpg";

function Responsive() {

  const sliderData = [
    {
      title: "Card",
      image: `${categoryImage}`,
      description: "This is the description of card."
    },
    {
      title: "Card",
      image: `${categoryImage}`,
      description: "This is the description of card."
    },
    {
      title: "Card",
      image: `${categoryImage}`,
      description: "This is the description of card."
    },
    {
      title: "Card",
      image: `${categoryImage}`,
      description: "This is the description of card."
    },
     {
      title: "Card",
      image: `${categoryImage}`,
      description: "This is the description of card."
    },
     {
      title: "Card",
      image: `${categoryImage}`,
      description: "This is the description of card."
    },
  ];

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <div className="slider-container container">
      <Slider {...settings}>
        {sliderData.map((item, index) => (
          <div key={index} className="p-3">
            <div className="card shadow-sm" style={{borderRadius:"10px"}}>
              <img 
                src={item.image} 
                alt={item.title} 
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius:"10px 10px 0 0" }}
              />
              <div className="p-3">
                <h4>{item.title}</h4>
                <p style={{ fontSize:"14px", color:"#555" }}>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Responsive;
