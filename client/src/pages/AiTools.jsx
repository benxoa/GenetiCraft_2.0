import React from 'react'
import { Link } from 'react-router-dom'

const AiTools = () => {
  return (
    <>
      <div className="bg-gray-900 dark:bg-gray-900 min-h-screen flex flex-col justify-center items-center pt-4 sm:pt-8 md:pt-1 py-40">
        <h1 className="bg-slate-900 text-white text-5xl flex justify-center mb-4 sm:mb-8">
          AI Powered PDF Tools
        </h1>

        <div className="w-full bg-gray-800 py-6 sm:py-8 md:py-12">
          <div className="container mx-auto flex justify-center items-center">
            <div className="flex flex-col sm:flex-row w-full md:w-3/4 max-w-3xl gap-4">
            <Link to={"/translate-pdf"}>

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
              </Link>
              <Link to={"/pdf-to-speech"}>


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
              </Link>

                <Link to={"/pdf-to-text"}>
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
</Link>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AiTools
