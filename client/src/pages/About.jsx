import React from "react";
import about1 from "../assets/about1.webp";
import about2 from "../assets/about2.webp";
import founder from "../assets/c1nxVphFr-QffiU-7ZWBwgIGHcccog2y9Q1fbQyKbvJh9o453L-uOJ8mSUy6fkHOhL.jpg";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <section class="bg-white dark:bg-gray-900">
        <h1 className="text-slate-200 text-6xl flex justify-center pt-16 ">
          Our UseCase
        </h1>

        <div class="gap-16 items-center py-8 px-[1rem] mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              What Is GenetiCraft For?
            </h2>
            <p class="mb-4">
              GenetiCraft, A Ultimate PDF Tool which supercharge the PDFs​
            </p>
            <p>
              At GenetiCraft, we offer powerful AI-driven tools designed to
              revolutionize your PDF experience. Seamlessly translate your
              documents into over 109 languages, or effortlessly manipulate PDFs
              with cutting-edge utilities. Our user-friendly interface empowers
              you to manage PDFs like never before, ensuring efficiency and
              precision in every task. With a suite of innovative features,
              including PDF Translation, PDF To Text, PDF To Speech our platform
              caters to diverse needs, whether you're a student, professional,
              or business entity. Experience the convenience of secure and swift
              PDF operations in one centralized hub.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-8">
            <img
              class="w-full rounded-lg"
              src={about1}
              alt="illistration content 1"
            />
            <img
              class="mt-4 w-full lg:mt-10 rounded-lg"
              src={about2}
              alt="illistration content 2"
            />
          </div>
        </div>
      </section>
      <hr />
      <section class="text-slate-300 body-font bg-slate-900">
        <h1 className="text-slate-200 text-6xl flex justify-center pt-10">
          Our Founder
        </h1>
        <div class="container px-5 py-24 mx-auto flex flex-col">
          <div class="lg:w-4/6 mx-auto">
            <div class="flex flex-col sm:flex-row mt-10">
              <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div class="w-20 h-20  inline-flex items-center justify-center text-gray-400">
                  <img src={founder} alt="founder png" />
                </div>
                <div class="flex flex-col items-center text-center justify-center">
                  <h2 class="font-medium title-font mt-4 text-slate-300 text-lg">
                    AB ATIF | Founder
                  </h2>
                  <div class="w-12 h-1 bg-green-400 rounded mt-2 mb-4"></div>
                  <p class="text-base">
                    As the founder and driving force behind GenetiCraft, I is a
                    visionary leader blending a profound passion for
                    technological innovation with a keen business acumen. With a
                    background in Ai, I embarked on a mission to reshape the
                    landscape of Ai Industry.
                  </p>
                </div>
              </div>
              <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p class="leading-relaxed text-lg mb-4">
                  At GenetiCraft, we offer powerful AI-driven tools designed to
                  revolutionize your PDF experience. Seamlessly translate your
                  documents into over 109 languages, or effortlessly manipulate
                  PDFs with cutting-edge utilities. Our user-friendly interface
                  empowers you to manage PDFs like never before, ensuring
                  efficiency and precision in every task. With a suite of
                  innovative features, including PDF Translation, PDF To Text,
                  PDF To Speech our platform caters to diverse needs, whether
                  you're a student, professional, or business entity. Experience
                  the convenience of secure and swift PDF operations in one
                  centralized hub.
                </p>

                {location.pathname !== "/" && (
                  <Link
                    to={"/"}
                    className="text-green-300 inline-flex items-center"
                  >
                    Go Back
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
    </div>
  );
};

export default About;
