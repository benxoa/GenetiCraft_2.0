import { useState } from "react";
import hero from "../src/assets/hero.webp";
import About from "./pages/About";
import FAQ from "./components/FAQ";
import StartNow from "./components/StartNow";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

function Home() {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  return (
    <>
      <div className="bg-gray-900 dark:bg-gray-900 min-h-screen flex flex-col justify-center items-center pt-24 sm:pt-12">
        <div className="w-full md:w-3/4 max-w-3xl relative">
          <div className="rounded-lg shadow-lg border-transparent overflow-hidden"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-4xl lg:text-5xl mb-8">
              The <span className="gradient-text">Ultimate</span> AI Powered PDF
              tool 📝
            </h1>
            <img
              src={hero}
              alt="Hero Image"
              className="w-full"
              style={{ maxWidth: "610px", height: "590px" }}
            />
            <p className="mb-4 mx-4 text-sm ">
              At GenetiCraft, we offer powerful AI-driven tools designed to
              revolutionize your PDF experience. Seamlessly translate your
              documents into over 109 languages, or effortlessly manipulate PDFs
              with cutting-edge utilities
            </p>

            <div className="flex gap-4">
            <Link to={"/ai-tools"}>
              <button
                className={`py-3 px-4 bg-blue-500 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105`}
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              >
                Try Now
              </button>
              </Link>
              <Link to="/about">
              <button
                className={`py-3 px-4 bg-green-500 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105`}
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => setIsHovered2(false)}
              >
                Learn More
              </button></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 dark:bg-gray-900 min-h-screen flex flex-col justify-center items-center pt-4 sm:pt-8 md:pt-1 py-40">
        <h1 className="bg-slate-900 text-white text-5xl flex justify-center mb-4 sm:mb-8">
          AI Powered PDF Tools
        </h1>

        <div className="w-full bg-gray-800 py-6 sm:py-8 md:py-12">
          <div className="container mx-auto flex justify-center items-center">
            <div className="flex flex-col sm:flex-row w-full md:w-3/4 max-w-3xl gap-4">
              <div className="flex justify-center items-center flex-col p-4 bg-gray-700 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                <div className="text-white text-center">
                  <h2 className="text-lg font-semibold gradient-text">
                    PDF TRANSLATOR
                  </h2>
                  <p className="text-sm">
                    Translate your PDFs into multiple languages with ease.
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center flex-col p-4 bg-gray-700 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                <div className="text-white text-center">
                  <h2 className="text-lg font-semibold gradient-text">
                    PDF TO SPEECH
                  </h2>
                  <p className="text-sm">
                    Convert your PDF text to spoken words.
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center flex-col p-4 bg-gray-700 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                <div className="text-white text-center">
                  <h2 className="text-lg font-semibold gradient-text">
                    PDF TO TEXT
                  </h2>
                  <p className="text-sm">
                    Extract text content from your PDF documents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-slate-900 px-1 mt-[-20.5rem]">
        <About />
      </div>
      {/* <div className=" bg-slate-900 px-1 ">
        <FAQ />
      </div> */}
      
      <div className=" bg-slate-900 px-1 ">
        <Testimonials />
      </div>
      <div className=" bg-slate-900 px-1 ">
        <StartNow />
      </div>
      <div className=" bg-slate-900 px-1 ">
        <Newsletter />
      </div>
     
    
   
    </>
  );
}

export default Home;
