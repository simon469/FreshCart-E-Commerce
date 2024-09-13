import React from "react";
import Slider from "react-slick";
import slider1 from "../../assets/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/slider-image-3.jpeg"
import slider4 from "../../assets/images/blog-img-1.jpeg"
import silder5 from "../../assets/images/blog-img-2.jpeg"

export default function HomeSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };
  return (
    <section className="pb-5 py-20 px-4">
    <div className="flex flex-wrap justify-center items-center">

        <div className="w-2/3">
        <Slider {...settings}>
        <div>
        <img src={slider1} className="h-[400px] w-full" alt="slider image" />
        </div>
        <div>
            <img src={slider2} className="h-[400px] w-full" alt="slider image" />
        </div>
        <div>
            <img src={slider3} className="h-[400px] w-full" alt="slider image" />
        </div>
        </Slider>
    </div>

    <div className="w-1/3 ">
        <div>
            <img src={slider4} className="w-full h-[200px]" alt="fixed side slider" />
        </div>
        <div >
            <img src={silder5} className="w-full h-[200px]"  alt="fixed side slider" />
        </div>
    </div>

    </div>
</section>
  );
}
