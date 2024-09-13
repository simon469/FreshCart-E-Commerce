import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import reseticon from "../../assets/images/icons8-password-reset-48.png"

const ResetPassword = () => {
    let [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    let passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/gm;

  let validationSchema = Yup.object({
    email: Yup.string().email("email is invalid").required("email is required"),
    newPassword: Yup.string()
      .matches(
        passRegex,
        "New password can have numbers, letters, _, ., -, and its min length is 6 characters"
      )
      .required("New password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: submitForgetPass,
  });

  async function submitForgetPass(values) {
    setLoading(true);

    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .catch((err) => {
        setLoading(false);

        setError(err.response.data.message);
      });
    navigate("/login");
  }

  return (
    <> 
    <div>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
    </div>
<div className="sm:w-[100%] text-center sm:mt-52 mt-44">
<div className="flex justify-center">
  <div >
    <img src={reseticon} className="w-full" alt="reset password icon" />
  </div>
<h1 className="text-3xl text-black-600  font-bold text-center mb-4 ml-2">
        Reset Password
      </h1>
</div>
</div>
<form method="post" onSubmit={formik.handleSubmit} className="w-[65%] mx-auto my-6 p-5">

    <div className="relative z-0 w-full mb-5 group">
    <input onBlur={formik.handleBlur} type="email" onChange={formik.handleChange} value={formik.values.email} name="email" id="email" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
         {/* handel Errors Email */}
    {formik.touched.email && formik.errors.email ?
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium mr-2">alert!</span>
  
      {formik.errors.email}
    </div>
  </div> : ""}
  
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email:</label>
    </div>

    <div className="relative z-0 w-full mb-5 group">
    <input onBlur={formik.handleBlur} type="password" onChange={formik.handleChange} value={formik.values.newPassword} name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
             {/* handel Errors Password */}
    {formik.touched.newPassword && formik.errors.newPassword ?
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium mr-2">alert!</span>
  
      {formik.errors.newPassword}
    </div>
  </div> : ""}
  
    <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password:</label>
    </div>

{/* <div className="flex justify-around">
<div className="mt-4 text-center">
  <span className="text-sm text-gray-500 dark:text-gray-300">Not have an account? </span>
  <Link to='/register' className="text-green-500 hover:text-green-600 m-2 py-2">Register</Link>
</div>

<div className="mt-4 text-center">
  <span className="text-sm text-gray-500 dark:text-gray-300">Not Remember Password? </span>
  <Link to='/resetpassword' className="text-green-500 hover:text-green-600 m-2 py-2">Forget Password</Link>
</div>
</div> */}


<button type="submit" className="text-white mt-3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    {isLoading == true ? (<i className="fa-solid fa-spinner fa-spin-pulse fa-fade"></i>) :("Submit") }</button>
</form>

</>
  )
}

export default ResetPassword