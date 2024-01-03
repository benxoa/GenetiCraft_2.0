import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const ResetPassword = () => {
  const Navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "Authtoken",
    "userId",
  ]);
  
  useEffect(() => {
    const userId = cookies.userId;
    const token = cookies.Authtoken;
    if (!userId || !token) {
      Navigate("/login");
    }
  }, []);

  const initialValues = {

    password: "",
    cpassword: "",
  };

  const validationSchema = Yup.object().shape({
 
    password: Yup.string().required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: cookies.userId,
          password: values.password,
        }),
      });

      if (res.status === 200) {
        toast.success("Password Reset successfull");
        setTimeout(() => {
          Navigate("/profile");
        }, 2000);
      } else if (res.status === 401) {
        toast.error("Password Reset unsuccessfull");
      } else if (res.status === 500) {
        toast.error("Server error");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <>
          <section className="bg-slate-900 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-slate-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Reset Password
                  </h1>
                  <div>
                    <Toaster />
                  </div>
                  <Form className="space-y-4 md:space-y-6">
                   
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        New Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirm password
                      </label>
                      <Field
                        type="password"
                        name="cpassword"
                        id="confirm-password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Confirm Password"
                      />
                      <ErrorMessage
                        name="cpassword"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-white bg-yellow-300 hover:bg-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      {isSubmitting ? "Reseting..." : "Reset Password"}
                    </button>
                    
                  </Form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </Formik>
  )
}

export default ResetPassword
