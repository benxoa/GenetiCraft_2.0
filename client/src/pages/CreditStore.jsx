import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useNavigate } from "react-router-dom";

const CreditStore = () => {
  const [credits, setCredits] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies([
    "Authtoken",
    "userId",
  ]);
  const Navigate = useNavigate();
  useEffect(() => {
    const userId = cookies.userId;
    const token = cookies.Authtoken;
    if (!userId || !token) {
      Navigate("/login");
    }
  }, []);

  const cardcredits = {
    PRO: 120,
    PRO_MAX: 230,
    BUSINESS: 340,
  };

  const handleBuyNow = async (creditsToBuy) => {
    try {
      const userId = cookies.userId;
      if (!userId || userId === undefined || userId === null) {
        toast.error("Please reLogin to purchase!");
      } else if (creditsToBuy <= 0) {
        toast.error("Please specify credits to purchase");
      } else {
        const res = await fetch("/api/purchase-credits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userId: userId,
            purchasedTokens: Number(creditsToBuy),
          }),
        });
        if (res.status === 200) {
          toast.loading("Purchasing credits...");

          setTimeout(() => {
            toast.dismiss();
            toast.success("Purchased successfully");
          }, 1600);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    } catch (error) {
      toast.error("There was an error processing the purchase");
    }
  };

  const handlePayment = async () => {
    try {
      const paymentResponse = await fetch(
        "/api/create-payment",
        {
          method: "POST",
        }
      );
      if (!paymentResponse.ok) {
        throw new Error("Network response was not ok.");
      }
      const paymentData = await paymentResponse.json();
      if (!paymentData || !paymentData.redirectUrl) {
        throw new Error("Redirect URL not found in the response.");
      }
      window.location.href = paymentData.redirectUrl;
      console.log(paymentResponse.status);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const createOrder_PRO = (data) => {
    return fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
     
          
            PlanName: "PRO",
            credits: cardcredits.PRO,
            price: 9.99,

          

      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove_PRO = async (data) => {
    const res = await fetch(
      `/api/orders/${data.orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    );
    const order = await res.json();
    console.log(order.status);
    if (order.status === "COMPLETED") {
      await handleBuyNow(cardcredits.PRO);
    } else {
      toast.error("There was an error in purchasing credits");
    }
  };

  const createOrder_PRO_MAX = (data) => {
    return fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

            PlanName: "PRO MAX",
            credits: cardcredits.PRO_MAX,
            price: 18.99,

    
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove_PRO_MAX = async (data) => {
    const res = await fetch(
      `/api/orders/${data.orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    );
    const order = await res.json();
    console.log(order.status);
    if (order.status === "COMPLETED") {
      await handleBuyNow(cardcredits.PRO_MAX);
    } else {
      toast.error("There was an error in purchasing credits");
    }
  };

  const createOrder_BUSINESS = (data) => {
    return fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PlanName: "BUSINESS",
        credits: cardcredits.BUSINESS,
        price: 24.99,
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove_BUSINESS = async (data) => {
    const res = await fetch(
      `/api/orders/${data.orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    );
    const order = await res.json();
    console.log(order.status);
    if (order.status === "COMPLETED") {
      await handleBuyNow(cardcredits.BUSINESS);
    } else {
      toast.error("There was an error in purchasing credits");
    }
  };

  return (
    <>
      <Toaster />

    

      <section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for your Ease</h2>
          <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at GenetiCraft we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
      </div>
      <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          
          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 class="mb-4 text-2xl font-semibold">PRO</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use & for your next project.</p>
              <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">$9.99</span>
              </div>
              
              <ul role="list" class="mb-8 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Max PDF page 5</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>No Ads</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>130 credits</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Premium support</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>All PDF Tools</span>
                  </li>
              </ul>
              <PayPalButton
                  createOrder={(data, actions) =>
                    createOrder_PRO(data, actions)
                  }
                  onApprove={(data, actions) => onApprove_PRO(data, actions)}
                />          </div>
          
          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 class="mb-4 text-2xl font-semibold">PRO MAX</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
              <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">$18.99</span>
              </div>
              
              <ul role="list" class="mb-8 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Max PDF page 6</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>No Ads</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>260 credits</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Premium support</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>All PDF Tools</span>
                  </li>
              </ul>
              <PayPalButton
                  createOrder={(data, actions) =>
                    createOrder_PRO_MAX(data, actions)
                  }
                  onApprove={(data, actions) =>
                    onApprove_PRO_MAX(data, actions)
                  }
                />          </div>
          
          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 class="mb-4 text-2xl font-semibold">BUSINESS</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
              <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">$24.99</span>
              </div>
              
              <ul role="list" class="mb-8 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Max PDF pages 8</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>No Ads</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>340 credits</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Premium support</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>All Tools</span>
                  </li>
              </ul>
              <PayPalButton
                  createOrder={(data, actions) =>
                    createOrder_BUSINESS(data, actions)
                  }
                  onApprove={(data, actions) =>
                    onApprove_BUSINESS(data, actions)
                  }
                />          </div>
      </div>
  </div>
</section>
    </>
  );
};

export default CreditStore;
