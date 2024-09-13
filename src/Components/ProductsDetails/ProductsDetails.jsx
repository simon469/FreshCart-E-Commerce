import axios from 'axios';
import { useContext, useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const ProductsDetails = () => {
    const{ addProductToCart } = useContext(cartContext);
    const [loading, setLoading] = useState(false)
    const { id } =useParams();

    async function getProduct(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    async function addProduct(){
        setLoading(true);
        const data =await addProductToCart(id);
        console.log(data);
        if(data){
            toast.success(data.message);
            setLoading(false);
        }else{
            toast.error("Error");
            setLoading(false);
        }
    }
    const {data , isLoading} = useQuery(`product${id}` , getProduct)
    if(isLoading){
        return  <div className="h-screen flex flex-wrap justify-center items-center bg-green-700">
        <FallingLines
        color="#fff"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"/>
            </div>
        }

    return (
<>
<div>
    <Helmet>
        <title>Product Details</title>
    </Helmet>
</div>

<section className='py-7'>
        <div className='w-full mt-40 lg:mt-24 md:mt-60 md:w-[80%] mx-auto'>
            <div className='flex flex-wrap items-center justify-center'>

                <div className='w-full md:w-1/3 p-5'>
                    <div>
                        <img className='w-full' src={data?.data.data.imageCover} alt="image product" />
                    </div>

                </div>

                <div className='w-full md:w-2/3 p-5 '>

                    <div>
                        <h2 className='text-2xl font-semibold mb-3'>{data?.data.data.title}</h2>
                        <p className='text-lg mb-3'>{data?.data.data.description}</p>
                        <h2 className='text-2xl text-green-600 font-mono mb-3'>{data?.data.data.category.name}</h2>
                        <div className=" flex flex-wrap justify-between items-center mt-3">
                <div>
                    <h4>{data?.data.data.price} EGP</h4>
                </div>
                <div>
                    <h4> <i className="fa-solid fa-star text-yellow-400" ></i> {data?.data.data.ratingsAverage} </h4>

                </div>  
                </div>
                    </div>

                </div>

                <button onClick={addProduct} type="button" className="w-full mx-auto mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md sm:w-auto px-32 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                {loading? <i className='fa-solid fa-spinner fa-spin text-white'></i> : "Add To Cart" }</button>

            </div>
        </div>

    </section>
</>
  )
}

export default ProductsDetails