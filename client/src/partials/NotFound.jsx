import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
   
      <section className="bg-white dark:bg-gray-900 h-screen">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500 text-green-400">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-yellow-300 md:text-4xl dark:text-white">
              Oop! Page not Found!
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Go Back to <Link to={"/"} className='underline text-vlue-300'>Home</Link>.
            </p>
          </div>
        </div>
      </section>
     
    </>
  )
}

export default NotFound
