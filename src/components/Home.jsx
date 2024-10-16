"use client";
import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import banner from "@/asset/image/banner3.jpg";
// import bannerLeft from "@/asset/image/bannerleft.png";
import { FiMapPin } from "react-icons/fi";


import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

 
  


  return (
    <div className=" relative mx-auto hero w-full border border-red-600 mt-12 bg-black">
      {/* Background Image */}
      {/* <Image
        src={banner}
        alt="Banner Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      /> */}
      {/* Overlay */}
      <div className="hero-overlay bg-black bg-opacity-60 absolute inset-0"></div>
      {/* Content */}
      <div className="relative py-20 z-10 md:flex items-center justify-between lg:gap-10 h-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Text Section */}
        <div className="text-white max-w-lg lg:max-w-md">
          <h1 className="mb-5 text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
            Quick Bites <br />
            <span className="text-[#f7b614]">Home Delivery</span>
          </h1>
          <p className="mb-5 lg:text-lg">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>

          {/* Location Input and CTA */}
          <div className="flex flex-row items-center w-full max-w-lg bg-white rounded-lg overflow-hidden shadow-lg mt-8">
            {/* Icon */}
            <span className="p-4 text-black">
              <FiMapPin size={24} />
            </span>

            {/* Location Input */}
            <input
              type="text"
              placeholder="Enter your delivery address"
              value={location}
           
              className="w-full px-4 text-black outline-none"
            />

            {/* CTA Button */}
            <button className="bg-[#f7b614] text-black px-4 py-4 rounded-l-none border-none hover:bg-[#d99512] w-[50%]">
              Find now
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div data-aos="fade-left" className="mt-24 md:mt-0 max-w-lg">
          {/* <Image src={bannerLeft} alt="Banner Left" className="object-contain" /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
