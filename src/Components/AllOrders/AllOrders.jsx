import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { FallingLines } from 'react-loader-spinner';
import notorder from '../../assets/images/Empty-Orders.svg'

const AllOrders = () => {
    const {id} =jwtDecode(localStorage.getItem("tkn"));
    const [load , setLoad] = useState(false);
    const [allOrder , setAllOrder] = useState(null);
    
    async function getAllOrder(id){
        setLoad(true)
        try {
            const{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)

            setAllOrder(data);
            setLoad(false);
            console.log(data);

        } catch (error) {
            console.log(error);
            setLoad(false)
        }
    }

    useEffect( ()=>{
        getAllOrder();
    } ,[]);

    if(load){
        return  <div className="h-screen flex flex-wrap justify-center items-center bg-green-700">
        <FallingLines
        color="#fff"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"/>
            </div>
    }

    return (

    <section className='py-10'>
        <div>
            <Helmet>
                <title>All Orders</title>
            </Helmet>
        </div>
        <div className="w-full md:w-[80%] mx-auto">

        {allOrder? allOrder.map((order,index)=> <div key={index}>

            <div className='p-5 mb-3 bg-slate-200'>
                <div className='flex flex-wrap justify-center items-center'>
                    {order.cartItem?.map((item, index)=>{
                        <div key={index} className='w-1/6'>
                            <img src={item.product.imageCover} className='w-full' alt="Product Image Cover" />
                        </div>
                    })}
                </div>

                <h2> Total Order Price : {order.totalOrderPrice} EGP</h2>
                <h2> Payment Method Type: {order.paymentMethodType} EGP</h2>

            </div>
        </div> ) :  <div className='p-8'>
        <div className="w-[65%]  mt-60 lg:mt-44 mx-auto">
                        <img className="w-full" src={notorder} alt="not order" />
        </div> 

        </div> }
        </div>
    
    
    </section>
  )
}

export default AllOrders