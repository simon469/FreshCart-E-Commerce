import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import reseticon from "../../assets/images/icons8-one-time-password-50.png"

import React from 'react'

const ResetCode = () => {
  let [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    resetCode: Yup.string()
      .matches(/^[0-9]{1,}$/, "Reset Code is invalid")
      .required("Reset Code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: submitResetCode,
  });

  async function submitResetCode(values) {
    setLoading(true);
    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
    navigate("/resetPassword");
  }

  return (
        <> 
    <div>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      {error ? (
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium"> alert!</span> {error}
        </div>
      </div>   
      ) : (
        ""
      )}
    </div>


<div className="sm:w-[100%] text-center sm:mt-52 mt-44">
{/* <h1 className="text-3xl text-green-600  font-bold">Reset Password</h1> */}
<div className="flex justify-center items-center">
  <div >
    <img src={reseticon} className="w-full mb-5" alt="reset password icon" />
  </div>
<h1 className="text-3xl text-black-600  font-bold text-center mb-6">
        Enter Reset Code
      </h1>
</div>
      <p className="text-green-600 font-serif text-center fs-5 font-medium">
        We've sent the reset code to your E-mail, please check it and enter the
        code below.
      </p>
</div>
<form method="post" onSubmit={formik.handleSubmit} className="w-[65%] mx-auto my-6 p-5">

    <div className="relative z-0 w-full mb-5 group">
    <input onBlur={formik.handleBlur} type="text" onChange={formik.handleChange} value={formik.values.resetCode} name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
         {/* handel Errors Email */}
    {formik.errors.resetCode ?
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium mr-2">alert!</span>
  
      {formik.errors.resetCode}
    </div>
  </div> : ""}
  
    <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reset Code :</label>
    </div>



<button type="submit" className="text-white mt-3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    {isLoading == true ? (<i className="fa-solid fa-spinner fa-spin-pulse fa-fade"></i>) :("Submit") }</button>
</form>

</>
  )
}

export default ResetCode