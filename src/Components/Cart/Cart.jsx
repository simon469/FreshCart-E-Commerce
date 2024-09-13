import { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import noproduct from '../../assets/images/Empty-cart.svg'

function Cart() {
  const {Products, TotalPrice, updateCount, deleteItem, clearCart} = useContext(cartContext);
  console.log(Products , "cart page");

  return <section className='py-7 my-[60%] md:my-[35%] lg:my-[12%]'>
    <div>
      <Helmet>
        <title>
          Cart
        </title>
      </Helmet>
    </div>
    <div className='w-full lg:w-[70%] md:w-[80%] mx-auto p-5 bg-slate-200'>
{Products?.length !=0 ? <>
  <h2 className='text-green-600 text-2xl font-mono'>Total Price : {TotalPrice} </h2>
  <button onClick={clearCart}
type="button" className="mx-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md sm:w-auto px-3 mr-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Clear Cart</button>

<Link to="/payment" className="mx-auto text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-md sm:w-auto px-3.5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">Payment</Link>

{Products?.map( (item , index)=> <>

<div key={index} className=' flex flex-wrap justify-center items-center border-b-2 border-green-600'>

<div key={index} className='w-1/6 p-4 '>
<img src={item.product.imageCover} className='w-full' alt="image product" />
</div>

<div key={index} className='w-4/6 p-5'>
<h2 className='mb-3 text-lg'>{item.product.title}</h2>
<h2 className='mb-3 text-lg'>{item.price} EGP</h2>
<button onClick={ ()=>deleteItem(item.product.id) }
type="button" className="mx-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md sm:w-auto px-24 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Remove</button>
</div>

<div key={index} className='w-1/6 p-5 max-w-xs mx-auto'>
<h4 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</h4>
<div key={index} className="relative flex items-center max-w-[8rem]">
  <button onClick={ ()=>updateCount(item.product.id, item.count-1) }
    disabled={item.count ==0? true : false } 
    type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className={ ` ${item.count == 0 ?"disabled:opacity-20" : "" }  bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none`}>
    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
    </svg>
  </button>
  <h2 id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 px-2 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{item.count}</h2>

  <button onClick={ ()=>updateCount(item.product.id, item.count+1) }
  disabled={item.count == 10? true : false }
    type="button" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
    </svg>
  </button>
</div>

</div>

</div>

</>)}
</> : <div className='p-8 my-auto'>
        <div className="w-[65%]  mt-60 lg:mt-44 mx-auto">
                        <img className="w-full" src={noproduct} alt="not order" />
        </div> 

        </div>}
    </div>
  </section>;
  
}
export default Cart


{/* 
{Products?.map( (item, index)=> (<>
  
  <div key={index}>

<div className=''>
<h2 className='mx-3'>{item.count}</h2>

</div>
</div>


</>
))} */}

{/* <div key={index} className='w-1/6 p-5'>
  <div className='flex justify-between items-center'>
  <button type="button" className=" w-4  mx-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md sm:w-auto px-32 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
  +</button>
    <h2 className='mx-3'>{item.count}</h2>
    <button type="button" className="w-4 mx-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md sm:w-auto px-32 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
  -</button>
  </div>

</div> */}