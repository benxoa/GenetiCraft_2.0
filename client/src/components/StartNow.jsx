import React from 'react'
import { Link } from 'react-router-dom'

const StartNow = () => {
  return (
    <>
      <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">SAFE AND 100% SECURE</h2>
            <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">The PDFs that you upload are 100% secure</p>
            <Link to={"/ai-tools"}><button  class="py-3 px-4 bg-blue-500 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105">Try For Free</button> </Link>
        </div>
    </div>
</section>
<hr />
    </>
  )
}

export default StartNow
