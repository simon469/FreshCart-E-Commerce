import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {

    async function getAllCategory(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

const {data} = useQuery("categorySlider", getAllCategory)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
  };
  return (
    <section className="p-5 "> 

<Slider {...settings}>

    {data?.data.data.map((item, index)=> {
        return <div key={index}>
            <img className="w-full h-[200px]" src={item.image} alt="category image" />
            <h2 className="text-green-600 text-sm font-bold">{item.name} </h2>
        </div>  
    })}
    </Slider>

    </section>
  );
}