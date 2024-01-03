import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import icon from "../assets/icon.png";

const Herder = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "Authtoken",
    "userId",
  ]);
  const [credits, setCredits] = useState(0);

  const isLoggedIn = cookies.Authtoken !== undefined;
  const HandleLogout = () => {
    removeCookie("Authtoken");
    removeCookie("userId");
    window.location.reload();
  };
  useEffect(() => {
    const fetchCredits = async () => {
      const userId = cookies.userId;
      try {
        const res = await fetch("/api/get-credits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        });
        if (res.status === 200) {
          const data = await res.json();
          setCredits(data.credits);
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    const intervalId = setInterval(fetchCredits, 2000);

    return () => clearInterval(intervalId);
  }, [cookies.userId]);
  const [menuState, setMenuState] = useState("menu");

  function onToggleMenu() {
    setMenuState((prevState) => !prevState);
  }

  return (
    <header>
      <Navbar className="" fluid>
        <Navbar.Brand className="">
          <img
            src="/logo.png"
            className="mr-1 h-8 sm:h-[3.25rem] mb-0"
            alt="GenetiCraft Logo"
          />
          <NavLink to="/">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              GenetiCraft
            </span>
          </NavLink>
        </Navbar.Brand>
        <div className=" flex md:order-2 ">
          {isLoggedIn ? (
            <>
              <Dropdown
                color="green"
                label="Ai Tools"
                className="focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 "
              >
                <Dropdown.Item className="rounded-lg">
                  <Link to={"/translate-pdf"}>Translate PDF</Link>
                </Dropdown.Item>
                <Dropdown.Item className="rounded-lg">
                  <Link to={"/pdf-to-text"}>PDF To Text</Link>
                </Dropdown.Item>
                <Dropdown.Item className="rounded-lg">
                  <Link to={"/pdf-to-speech"}>PDF To Speech</Link>
                </Dropdown.Item>
              </Dropdown>

              <div className="mr-1"></div>

              <Dropdown
                className=""
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    className="mb-[-30px] my-[5.5px]"
                    alt="User settings"
                    img={icon}
                    rounded
                  />
                }
              >
                <Link to={"/profile"}>
                  {" "}
                  <Dropdown.Item>User Profile</Dropdown.Item>
                </Link>
                <Dropdown.Item>
                  <span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Credits: {credits}
                  </span>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <button
                    type="button"
                    onClick={HandleLogout}
                    className="block py-2 px-3 text-green-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </button>
                </Dropdown.Item>
              </Dropdown>

              <Navbar.Toggle />
            </>
          ) : (
            <>
              <button className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-green-900">
                <Link to={"/ai-tools"}>Try Now</Link>
              </button>

              <Navbar.Toggle />
            </>
          )}
        </div>
        <Navbar.Collapse>
          <li>
            <Link
              to="/"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/privecy-policy"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Privecy Policy
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/store"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Credit Store
                </Link>
              </li>
              {/* <li>
                <span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Credits: {credits}
                </span>
              </li> */}
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Herder;
