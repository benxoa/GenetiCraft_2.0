import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const PdftoText = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const Navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["Authtoken"]);
  const [credits, setcredits] = useState(0);


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
          setcredits(data.credits);
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    const intervalId = setInterval(fetchCredits, 2000);

    return () => clearInterval(intervalId);
  }, [cookies.userId]);

  const uploadFile = async (e) => {
    e.preventDefault();
    if(!cookies.userId || !cookies.Authtoken) {
      toast.error("Please Login or Register")
    }
    else if (credits < 3) {
      toast.error("Insufficient credits, credits must be greater or equal to 7");
      return;
    }else {
      try {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await axios.post(
        "/api/pdf-to-text",
        formData
      );

      if (response.status === 200) {
        const res = await fetch(
          "/api/deduct-credits",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: cookies.userId, amount: 3 }),
          }
        );
        if (res.status === 200) {
          setcredits(credits - 3);
        } else {
          toast.error("Failed to deduct credits");
        }
        toast.success("Converted to text successfully")
        setText(response.data);
      } else {
        toast.error("Failed to convert PDF to text");
      }
    } catch (error) {
      toast.error("Error uploading file:", error);
    }
    }

    
  };

  const copyText = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("Copied Text successfully")
      })
      .catch((err) => {
        toast.error("Failed to copy")
      });
  };

  return (
    <>
      <Toaster />

      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12 ">
  <div className="w-full max-w-[58rem] bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 sm:p-4 lg:p-6 m-4">
    <div className="p-6 space-y-4 ">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center ">
        PDF TO TEXT
      </h1>
    
      <form className="space-y-4" onSubmit={uploadFile}>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help"></p>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-300 hover:bg-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Convert To Text
        </button>
        {text && (
          <>
            <div className="block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-auto h-[400px]">
              {text}
            </div>
            <button type="button" onClick={copyText} className="bg-green-400 rounded-md w-full text-white py-2">
              Copy Text
            </button>
          </>
        )}
      </form>
    </div>
  </div>
</section>


    </>
  );
};

export default PdftoText;
