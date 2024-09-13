import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";
import * as Yup from 'yup';

function Register() {

    const [isLoading, setIsLoading ] = useState(false)
    const navigate = useNavigate() 

    const initialValues={
        name: "",
        email : "",
        password : "",
        rePassword :"",
        phone : "",
    }

    const validationSchema = Yup.object({
        name : Yup.string().required("Name is required").min(3,"Name length must be more than 2").max(20,"Name length must be less than 20"),
        email : Yup.string().required("Email is required").email("Enter valid email"),
        password : Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,"Minimum eight characters, at least one letter, one number and one special character"),
        rePassword : Yup.string().required("RePassword is required").oneOf([Yup.ref("password")],"Password and RePassword must be Matched"),
        phone : Yup.string().required("Phone is required"),
    })

    
    async function onSubmit(){

        setIsLoading(true)
        try {
            let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            toast.success(data.message);
            setIsLoading(false)
            navigate("/login")
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
            setIsLoading(false)
        }
    }

    let {handleSubmit, values, handleChange, errors, touched, handleBlur} = useFormik({
        initialValues,
        onSubmit ,
        validationSchema
    })


    return (
    <> 
    <div>
      <Helmet>
        <title>
          Register
        </title>
      </Helmet>
    </div>
<div className="mt-44 md:mt-36">
<h1 className="text-3xl text-green-600 text-center py-2 m-4 font-bold"> 
<i className="fa-solid fa-cart-shopping"></i>Welcome to FreshCart</h1>
<form onSubmit={handleSubmit} className="w-[65%] mx-auto my-6 p-5">
<div className="relative z-0 w-full mb-5 group">
    <input onBlur={handleBlur} type="text" onChange={handleChange} value={values.name} name="name" id="name" className="block py-2 px-2 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-whit dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
    {/* handel Errors Name */}
    {touched.name && errors.name ?
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium mr-2">alert!</span>
  
      {errors.name}
    </div>
  </div> : ""}


    {/* {touched.name && errors.name && <p className="text-red-500">{errors.name}</p>} */}
    
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
    </div>

    <div className="relative z-0 w-full mb-5 group">
    <input onBlur={handleBlur} type="email" onChange={handleChange} value={values.email} name="email" id="email" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
         {/* handel Errors Email */}
    {touched.email && errors.email ?
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium mr-2">alert!</span>
  
      {errors.email}
    </div>
  </div> : ""}
  
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
    <input onBlur={handleBlur} type="password" onChange={handleChange} value={values.password} name="password" id="password" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
             {/* handel Errors Password */}
    {touched.password && errors.password ?
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium mr-2">alert!</span>
  
      {errors.password}
    </div>
  </div> : ""}
  
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
    <input onBlur={handleBlur} type="password" onChange={handleChange} value={values.rePassword} name="rePassword" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"/>
                 {/* handel Errors rePassword */}   
    {touched.rePassword && errors.rePassword ?
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium mr-2">alert!</span>
  
      {errors.rePassword}
    </div>
    </div> : ""}
    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
    <input onBlur={handleBlur} type="tel" onChange={handleChange} value={values.phone} name="phone" id="phone" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  />
             {/* handel Errors phone */}
    {touched.phone && errors.phone ?
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span className="sr-only">Info</span>
    <div>
        <span className="font-medium mr-2">alert!</span>
        {errors.phone}
    </div>
    </div> : ""}
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
    </div>
<div className="mt-4 text-center">
  <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
  <NavLink to="/login" className="text-green-500 hover:text-green-600 m-2 py-2">Login</NavLink>
</div>


<button type="submit" className="text-white mt-3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    {isLoading == true ? <i className="fa-solid fa-spinner fa-spin-pulse fa-fade"></i>: "Register"}</button>
</form>

</div>
</>
)
}

export default Register