import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import icon from '../assets/icon.png'


const UserProfile = () => {

  const Navigate = useNavigate();
 

  const [credits, setCredits] = useState(0);

  const [cookies, setCookie, removeCookie] = useCookies([
    "Authtoken",
    "userId",
  ]);

  const isLoggedIn = cookies.Authtoken !== undefined;

  useEffect(() => {
    if (!isLoggedIn) {
      Navigate("/");
    }
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
        console.log(cookies.userId);
      }
    };

    fetchCredits();
  }, []);

  return (
    <div className="h-screen container mx-auto py-8 flex flex-col items-center justify-center bg-slate-900 text-white">
      <div className="flex flex-col items-center justify-center mb-8">
        <img
          src={icon}
          alt="User Profile"
          className="w-24 h-24 rounded-full  "
        />
        <div className="text-lg font-semibold">
          Username: <span className="text-blue-500">aqxplay</span>
        </div>

        <div className="text-lg font-semibold">
          Credits: <span className="text-blue-500">{credits}</span>
        </div>
      </div>

      {/* Reset Password Button */}
      <button
        className="bg-yellow-300 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-black"
        
      >
        <Link to={"/reset-password"}>Reset Password</Link>
      </button>
    </div>
  );
};

export default UserProfile;
