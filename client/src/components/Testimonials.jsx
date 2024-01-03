import React, { useState } from 'react'


const Testimonials = () => {

  return (
    <>
      <section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Customer FeedBack</h2>
      </div> 
      <div class="grid mb-8 lg:mb-12 lg:grid-cols-2">
          <figure class="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
              <blockquote class="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white"></h3>
                  <p class="my-4">This Tool is amazing. Now i can easily translate my PDfs, this tools have made my life easier.</p>
                  
              </blockquote>
              <figcaption class="flex justify-center items-center space-x-3">
              <img class="w-9 h-9 rounded-full" width="100" height="100" src="https://img.icons8.com/ios-filled/100/gender-neutral-user.png" alt="profile picture"/>
                  <div class="space-y-0.5 font-medium dark:text-white text-left">
                      <div>James Dan01</div>
                      <div class="text-sm font-light text-gray-500 dark:text-gray-400">Teacher</div>
                  </div>
              </figcaption>    
          </figure>
          <figure class="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700">
              <blockquote class="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                  <p class="my-4">The Pdf to Speech feature is amazing and the voice over is also very professional</p>
              </blockquote>
              <figcaption class="flex justify-center items-center space-x-3">
                  <img class="w-9 h-9 rounded-full" width="100" height="100" src="https://img.icons8.com/ios-filled/100/gender-neutral-user.png" alt="profile picture"/>
                  {/* <img  alt="gender-neutral-user"/> */}
                  <div class="space-y-0.5 font-medium dark:text-white text-left">
                      <div>Reger972</div>
                      <div class="text-sm font-light text-gray-500 dark:text-gray-400">Etsy Store owner</div>
                  </div>
              </figcaption>    
          </figure>

          
      </div>

      </div>
</section>
<hr />
    </>
  )
}

export default Testimonials
