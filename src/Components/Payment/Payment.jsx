import axios from "axios";
import { useContext, useState } from "react"
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

const Payment = () => {
    const {cartId ,setnumOfItem, setTotalPrice, setProducts} = useContext(cartContext);
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [details, setDetails] = useState("");


    async function cashPayment(){
        const x={
            shippingAddress:{
                details,
                phone,
                city,
        }
        };
        // console.log(x);
        // Call API
        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
                x,
                {
                    headers:{
                        token: localStorage.getItem("tkn"),
                    },
                }
            );
            setnumOfItem(0);
            setProducts([]);
            setTotalPrice(0);
            toast.success(data.status);
        } catch (error) {
            toast.error("Error Cash Payment")
        }


    }

    async function onlinePayment() {
        const x={
            shippingAddress:{
                details,
                phone,
                city,
        }
        };

        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
                x,
                {
                    headers:{
                        token: localStorage.getItem("tkn"),
                    },
                }
            );
            // setnumOfItem(0);
            // setProducts([]);
            // setTotalPrice(0);
            window.open(data.session.url);
            toast.success(data.status);
        } catch (error) {
            toast.error("Error Cash Payment")
        }

    }

return (
<>
<div>
    <Helmet>
        <title>Payment</title>
    </Helmet>
</div>
<section className="py-36 mt-40 md:mt-36 lg:mt-14 lg:py-16">
        <h2 className=" text-center font-bold text-2xl text-green-600">
            Payment Process
        </h2>

    <div className="w-full md:w-[70%] mx-11 md:mx-auto ">

    <div>

        {/* Phone */}
        <div className=" relative z-0 w-full mt-20 mb-4 group">
    <input onChange={ (e)=> setPhone(e.target.value) }
    type="tel" name="phone" id="phone" className="mb-5 block py-2.5 px-0 w-full  text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  />
        <div>

    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span className="sr-only">Info</span>
    <div>
        <span className="font-medium mr-2">alert!</span>
        {/* {errors.phone} */}
    </div>
    </div>

    <label htmlFor="phone" className=" peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
    </div>
    </div>

            {/* Details */}
        <div className=" relative z-0 w-full mt-28 mb-5 group">
    <input onChange={ (e)=> setDetails(e.target.value) }
    type="text" name="details" id="details" className="mb-5 block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  />
        <div>

    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span className="sr-only">Info</span>
    <div>
        <span className="font-medium mr-2">alert!</span>
        {/* {errors.phone} */}
    </div>
    </div>

    <label htmlFor="details" className=" peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
    </div>
    </div>

        {/* City */}
        <div className=" relative z-0 w-full mt-28 mb-5 group">
    <input onChange={ (e)=> setCity(e.target.value) }
    type="text" name="city" id="city" className="mb-5 block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  />
        <div>
    <div className="flex items-center p-4 mb-10 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span className="sr-only">Info</span>
    <div>
        <span className="font-medium mr-2">alert!</span>
        {/* {errors.phone} */}
    </div>
    </div>

    <label htmlFor="city" className=" peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
    </div>
    </div>

    <button onClick={cashPayment}
    className="text-white mt-3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    Cash Payment</button>

    <button onClick={onlinePayment}
    className="text-white mt-3 ml-11 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    Online Payment</button>

    </div>

    </div>

    </section>

</>
)
}

export default Payment