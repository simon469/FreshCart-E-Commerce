import { NavLink, useNavigate } from "react-router-dom"
import logoimg from "../../assets/images/freshcart-logo.svg"
import { authContext } from "../../Context/AuthContext"
import { useContext } from "react"
import { cartContext } from "../../Context/CartContext";

function Navbar() {

  const {token, setToken} = useContext(authContext);
  const navigate =useNavigate();
  const {numOfItem} = useContext(cartContext)

  function logout(){
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/login");
  }

    return (

<nav className="py-4 bg-slate-200 fixed right-0 left-0 top-0 ">
      <div className="lg:w-[90%] mx-auto lg:flex lg:flex-wrap lg:justify-between lg:items-center ">
      <div className="logo">
      <NavLink to="/" >
        <img className="text-center m-auto hover:scale-125" src={logoimg} alt="logo freshcart" />
      </NavLink>
  </div>

  <div className="navlink text-center">
      <ul className="lg:flex lg:flex-wrap lg:justify-between lg:items-center">

          {token? <>
            <li className="mt-3 lg:ml-4 hover:text-green-600" >
          <NavLink to="/">Product</NavLink>
        </li>

        <li className="mt-3 lg:ml-4 hover:text-green-600" >
          <NavLink to="/brands">Brands</NavLink>
        </li>

        <li className="mt-3 lg:ml-4 hover:text-green-600" >
          <NavLink to="/categories">Categories</NavLink>
        </li>

        <li className="mt-3 lg:ml-4 hover:text-green-600" >
          <NavLink to="/allorders">All Orders</NavLink>
        </li>
          </> : ""}

      </ul>
  </div>

  <div className="social text-center lg:flex lg:flex-wrap lg:justify-between lg:items-center">
    <div className="mt-3 relative" >
    <i className="lg:ml-3 hover:text-green-600 fa-brands fa-instagram"></i>
    <i className="lg:ml-3 ml-2 hover:text-green-600 fa-brands fa-facebook"></i>
    <i className="lg:ml-3 ml-2 hover:text-green-600 fa-brands fa-tiktok"></i>
    <i className="lg:ml-3 ml-2 hover:text-green-600 fa-brands fa-twitter"></i>
    <i className="lg:ml-3 ml-2 hover:text-green-600 fa-brands fa-linkedin"></i>
    <i className="lg:ml-3 ml-2 hover:text-green-600  fa-brands fa-youtube"></i>
    <NavLink to="/wishlist"><i className="lg:ml-3 ml-2 hover:text-red-600 fa-lg fa-solid fa-heart"></i></NavLink>
    <NavLink to="/cart"><i className="lg:ml-3 ml-2 hover:text-green-600 fa-lg fa-solid fa-cart-shopping"></i>
    <div className="absolute inline-flex items-center justify-center w-6 h-5 text-xs font-bold text-white
        bg-red-500 border-2 border-white rounded-full  sm:end-[34%] md:end-[35%] -top-3 lg:-end-4 dark:border-gray-900">{numOfItem}</div>
    </NavLink>

    
    </div>

    <div className="mt-3" >

        {token? <button onClick={logout} className="ml-5 lg:mt-0 mt-4 hover:text-green-600">LogOut</button>
        : <>
          <NavLink className="lg:ml-5 hover:text-green-600"  to="/login">Login</NavLink>
          <NavLink className="ml-5 lg:mt-0 mt-4 hover:text-green-600" to="/register">Register</NavLink>
        </>}

        
    </div>

  </div>
      </div>
</nav>

  )
}

export default Navbar