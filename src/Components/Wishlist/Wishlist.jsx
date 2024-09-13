import { useContext, useEffect, useState } from 'react'
import { WishlistContext } from '../../Context/WishlistContext'
import { cartContext } from '../../Context/CartContext';
import toast from "react-hot-toast";
import img1 from '../../assets/images/Empty-cart.svg'
import { Helmet } from 'react-helmet';

export default function Wishlist() {

  let {getWishlist , removeToWishlist ,setWishlist ,wishlistArr } = useContext(WishlistContext);
  let {addProductToCart , numOfItem} = useContext(cartContext);
  let [loading, setAddLoading] = useState(false)

  async function getAllWishlist() {
    let {data} = await getWishlist();
    if (data.status == 'success') {
      setWishlist(data?.data)
    }
  }
  useEffect(()=>{
    getAllWishlist();
  },[])

  async  function addProductCart(id) {
    setAddLoading(true)
     let data = await addProductToCart(id)
     if (data.status =='success') {
      setAddLoading(false)
      numOfItem(data.numOfCartItems)
        toast.success('add to cart success')
     }
     getAllWishlist();
    }

    async function removeWishList(id) {
      setAddLoading(true)
      let {data} = await removeToWishlist(id)
      if (data.status == 'success') {
        setAddLoading(false)
        getAllWishlist();
      }
    }

    if (wishlistArr?.length == 0) return (<div className=' pt-5 w-1/2 mt-[80%] flex justify-center items-center'> <img src={img1} className=' w-full' alt="no item" /></div>)
 
 
  return (
    <>
        <Helmet>
          <title>WisList</title>
        </Helmet>
{wishlistArr?.length > 0 ?
      <div className="w-full mt-[64%] lg:mt-[10%] md:mt-[40%] md:w-[80%] mx-auto">
        <div className="flex flex-wrap items-center justify-center">
        {wishlistArr?.map((product) => (
          <div key={product.id} className="bg-white border-b border-green-600 hover:bg-gray-50">
            <div className='p-0 flex items-center justify-center'>

          <div className="w-full md:w-1/3 p-5">
              <img src={product.imageCover} className="w-full" alt="Favorite Product" />
          </div>

          <div className="w-full md:w-2/3 lg:w-[40%] p-2 font-semibold text-gray-900 dark:text-white">

          <p className='mb-3 font-mono text-lg'>{product.title}</p>
       
          <h3 className='px-1 py-1 font-semibold text-gray-900 dark:text-white'>{product.price} EG</h3>

          <div className='mt-3 flex items-center justify-between'>
          <td className="flex">
          <button  className="font-medium text-red-600 hover:text-red-600 hover:font-bold" onClick={()=> removeWishList(product.id)}>Delete</button>

            </td>
            <td className="flex ">
          <button className="font-medium text-green-600 hover:text-green-600 hover:font-bold" disabled={loading} onClick={()=> addProductToCart(product.id)}>Add to
          <i className="lg:ml-3 ml-2 hover:text-green-600 fa-lg fa-solid fa-cart-shopping"></i>
          </button>
          </td>
</div>
          <div>

          </div>
          </div>

            </div>
        </div>
    
      ))}

  </div>
      </div>
      : <h2 className="  text-white p-3  bg-emerald-600  text-3xl my-8 text-center ">
        No items in your wishlist
      </h2> }
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  
      </div>

    </>
  );
}
