import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";



const Login = () => {
  const [cookies, setCookie] = useCookies(['userId']);

  const Navigate = useNavigate();
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const HnaldeChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };


  const HandleSubmmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {

      setCookie('userId', data.userId, {path: '/', expires: new Date(Date.now() + 2592000000)})
      toast.success("Logged in successfully!");
      setTimeout(() => {
        Navigate("/ai-tools");
        window.location.reload()
      }, 1300);
    } else if (res.status === 400) {
      toast.error("Invaild email or password!");
    } else if (res.status === 500) {
      toast.error("server error");
    }else if (res.status === 401) {
      toast.error("Email not Verified!");

    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900   h-screen ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-36">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login to your account
              </h1>
              <div>
                <Toaster />
              </div>
              <form className="space-y-4 md:space-y-6" onSubmit={HandleSubmmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    value={user.email}
                    onChange={HnaldeChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={user.password}
                    onChange={HnaldeChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-yellow-300 hover:bg-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Login
                </button>
                <p className="text-sm font-dark text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Regsiter
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
