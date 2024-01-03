import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";



const Contact = () => {
  const [form, setform] = useState({
    email: "",
    subject: "",
    message: "",
  })
  const handleChange = (e) => {
    setform({...form, [e.target.name]: e.target.value})
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: form.email,
          subject: form.subject,
          message: form.message
        })
      });
  
      if (res.status === 201) {
        
        toast.success("Form sent successfully!");
      } else {
        toast.error(`Failed to send form!`);
      }
      
    } catch (error) {

      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later.");
    }
  };
  return (
    <>
          <Toaster />

      <section class="bg-white dark:bg-gray-900">
  <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
      <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
      <form onSubmit={HandleSubmit} class="space-y-8">
          <div>
              <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input onChange={handleChange} name="email" type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@mail.com" required/>
          </div>
          <div>
              <label htmlFor="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <input onChange={handleChange} name="subject" type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required/>
          </div>
          <div class="sm:col-span-2">
              <label htmlFor="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea onChange={handleChange} name="message" id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit" class="w-full text-white bg-yellow-300 hover:bg-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send Message</button>
      </form>
  </div>
</section>
    </>
  )
}

export default Contact
