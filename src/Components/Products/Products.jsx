import axios from "axios"
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { WishlistContext } from "../../Context/WishlistContext";

function Products() {
  const {addProductToCart} =useContext(cartContext);
  const { addToWishlist  , removeToWishlist} = useContext(WishlistContext);
  const [search , setSearch] = useState('');

  async function getAllProducts(){
      return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

const {data, isLoading } = useQuery("prducts", getAllProducts,
  {
    // refetchOnMount:false
    // refetchInterval:2000
    // cacheTime:700
    // enabled:false
    // onclick{refetch} => button 
  }
);

// console.log(data?.data.data)
async function addProduct(id){

  const data =await addProductToCart(id);
  console.log(data);
  if(data){
      toast.success(data.message);

  }else{
      toast.error("Error");

  }
}

async function addWishlist(id){
  const { data } = await addToWishlist(id);
  console.log(data);
  if(data){
    toast.success('Product Added to Wishlist');
  }else{
    toast.error('Product did not get removed from Wishlist');
  }
}
async function removeWishlist(id){
  const { data } = await removeToWishlist(id);
  if(data){
    toast.success(data.message)
  }else{
    toast.error("Error");
  }

}
const filteredData = data?.data?.data.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()))
if(isLoading){
  return  <div className="h-screen flex flex-wrap justify-center items-center bg-green-700">
  <FallingLines
  color="#fff"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"/>
    </div>
}

  return <>
<div>
  <Helmet>
    <title>Home</title>
  </Helmet>
</div>

<section className="py-8 mt-[50%] md:mt-[30%] lg:mt-[1%]">
    <div className="w-full md:w-[90%] m-auto">
      <HomeSlider/>
      <CategorySlider/>
      {/* Search Bar */}
      <form className="max-w-md mx-auto my-6">   
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input type="search" id="default-search" onChange={(e)=> setSearch(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search ..." required />
    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
  </div>
      </form>

      <div className="flex flex-wrap justify-center items-center">
          {filteredData.map((element, index )=> <>
            <div key={index} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-4"> 

              <div className="inner p-4 bg-slate-200 relative">
              <button >
              <i className={`lg:ml-3 ml-2 hover:text-red-600 fa-xl absolute right-3 top-5 fa-solid fa-heart`} onClick={(e)=>{
          if (e.target.classList.contains('fa-regular')) {
            addWishlist(element._id);
                e.target.classList.remove('fa-regular')
                e.target.classList.add('fa-solid')
          }else if (e.target.classList.contains('fa-solid')) {
            removeWishlist(element._id)
            e.target.classList.add('fa-regular')
            e.target.classList.remove('fa-solid')
          }}}
          ></i>
                </button>
              <Link to={`/productsDetails/${element.id}`}>
              <img src={element.imageCover} alt="Products image" className="w-full" />
              <h2 className="text-green-600 mt-3">{element.category.name}</h2>
              <h2 className="mt-3">{element.title.split(" ").slice(0,2).join(" ")}</h2>

              <div className=" flex flex-wrap justify-between items-center mt-3">
                <div>
                  <h4>{element.price} EGP</h4>
                </div>
                <div>
                  <h4> <i className="fa-solid fa-star text-yellow-400" ></i> {element.ratingsQuantity} </h4>
                </div>  
              </div>
              </Link>
              <button onClick={ ()=> addProduct(element.id) } type="button" className="w-full mx-auto mt-4  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-7 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
               Add to Cart</button>
            </div>
              
              
          </div>
          </>
         )}
      </div>
    </div>
  </section>
    </>
}

export default Products