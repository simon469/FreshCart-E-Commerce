import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './AuthContext'


export const cartContext = createContext();

const CartContextProvider = ({children}) => {
  const {token} = useContext(authContext);
  const [numOfItem, setnumOfItem] = useState(0);
  const [Products, setProducts] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState(0);

async function addProductToCart(productId){
    try {
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
      }, {
        headers :{
          token:localStorage.getItem("tkn"),
        },
      }
      );

      // setnumOfItem(data.numOfCartItems);
      // setProducts(data.data.products);
      // setTotalPrice(data.data.totalCartPrice);
      getUserCart();
      return data
    } catch (error) {
      console.log(error);
    }
  }

async function getUserCart() {
  try {
    const{data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{ token : localStorage.getItem("tkn"),}
    });

    setnumOfItem(data.numOfCartItems);
    setProducts(data.data.products);
    setTotalPrice(data.data.totalCartPrice);
    setCartId(data.data._id);

    return data;
    
  } catch (error) {
    console.log(error, "getUserCart Context");
  }
}

async function updateCount(id ,count){
  try {
    let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: count,
      },{
        headers:{
          token : localStorage.getItem("tkn"),
        }
      }
    );

    setnumOfItem(data.numOfCartItems);
    setProducts(data.data.products);
    setTotalPrice(data.data.totalCartPrice);
    setCartId(data.data._id);

    return data;
  } catch (error) {
    console.log(error , "error update count");
  }
}

async function deleteItem(id){
  try {
    const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      headers:{
        token:localStorage.getItem("tkn"),
      }
    });

    setnumOfItem(data.numOfCartItems);
    setProducts(data.data.products);
    setTotalPrice(data.data.totalCartPrice);
    setCartId(data.data._id);

    return data;

  } catch (error) {
    console.log(error , "error deleteItem")
  }
}

async function clearCart(){
  try {
    const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers:{
        token:localStorage.getItem("tkn"),
      }
    });

    setnumOfItem(0);
    setProducts([]);
    setTotalPrice(0);

    return data;

  } catch (error) {
    console.log(error , "error ClearAll Cart")
  }
}

useEffect( ()=>{
  if(token != null){
    getUserCart();
  }
  
} , [token]);

  return <cartContext.Provider
    value={{addProductToCart, Products, TotalPrice, numOfItem,
    updateCount,deleteItem, clearCart , cartId ,
    setnumOfItem, setTotalPrice, setProducts}}>
    
    {children}</cartContext.Provider>
}

export default CartContextProvider