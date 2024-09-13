import axios from "axios";
import { createContext,  useEffect,  useState } from "react";

export const WishlistContext = createContext();

const WishlistContextProvider = ({children}) => {

    let [wishlistArr, setWishlist] = useState([]);

    function addToWishlist(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{
            headers:{
                token : localStorage.getItem('userToken')
            }
        })
        .then((response)=>response).catch((error)=>error)
      }
    function removeToWishlist(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers:{
                token : localStorage.getItem('userToken')
            }
        })
        .then((response)=>response).catch((error)=>error)
      }

    function getWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers:{
                token : localStorage.getItem('userToken')
            }
        })
        .then((response)=>response).catch((error)=>error)
      }
 
    async function getAllWihlist() {
        let {data} = await getWishlist()
        if (data?.status == 'success') {
            setWishlist(data?.data)
          }
    }
    
    useEffect(()=>{
        getAllWihlist()
    },[]);


    return <WishlistContext.Provider 
    value={{addToWishlist , removeToWishlist , getWishlist , setWishlist ,wishlistArr }}>
    {children}
    </WishlistContext.Provider>
}

export default WishlistContextProvider
