// homepage.jsx
import React, { useState,useEffect }from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import image from '../assets/1.jpg';
import icon3 from '../assets/icon3.png'
import icon2 from '../assets/icon2.png'
import icon1 from '../assets/icon1.png'
import { Navigate,useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact') {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    if (location.hash === '#services') {
      document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);


  return (
<div className="bg-coffee min-h-screen flex flex-col">
  <Header />

  <section className="bg-white text-coffee py-36 text-left flex flex-wrap items-center">
    <div className="w-full lg:w-1/2 px-6 lg:pl-24 lg:pr-12">
      <h1 className="text-5xl font-bold mb-6">
      Take smarter notes with AI,<span className="text-brown"> Anytime! </span>
      </h1>
      <p className="text-lg mb-8">
       
Synergie is your collaborative workspace where brilliant ideas meet powerful AI. Think, work, and create—together, effortlessly..
      </p>
    </div>
    <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
      <img
        src={image}
        alt="Hero Image"
        className="w-4/5 max-w-md lg:max-w-lg"
      />
    </div>
  </section>

   <section id='services'>
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 ">
          <Card 
            icon="🔒" 
            title="Secure and Private" 
            description="Your data is encrypted and protected." 
          />
          <Card 
            icon="🔔" 
            title="Notifications & Reminders" 
            description="Never miss your appointment." 
          />
          <Card 
            icon="📊" 
            title="User-Friendly Website" 
            description="Manage notes and tasks easily." 
          />
          <Card 
            icon="⚡" 
            title="Fast and Reliable" 
            description="Optimized for performance and scalability." 
          />
        </div>
      </section>

      <section className=" py-10 my-20 rounded-lg shadow-2xl w-4/5 mx-auto flex items-center justify-center
       h-4/5 border-t-[2px] border-l-[2px] border-white/50 bg-white/25 overflow-hidden backdrop-blur-sm
      ">
  <div className="container text-center px-4">
  
    <h2 className="text-cream text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
    <p className="text-cream text-base md:text-lg mb-12">
      You control the user experience & we handle the backend.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      <div className="flex flex-col items-center text-center">
        <img
          src={icon1} 
          alt="Sign Up"
        />
        <h3 className="text-cream text-xl font-semibold ">Sign Up</h3>
        <p className="text-cream text-sm md:text-base">
          Create your account in seconds.
        </p>
      </div>

    
      <div className="flex flex-col items-center text-center">
        <img
          src={icon2} 
          alt="Book Appointment"
        />
        <h3 className="text-cream text-xl font-semibold ">
          Take Notes
        </h3>
        <p className="text-cream text-sm md:text-base">
          Work easily with our intuitive interface.
        </p>
      </div>

  
      <div className="flex flex-col items-center text-center">
        <img
          src={icon3} 
          alt="Get Notified"
        />
        <h3 className="text-cream text-xl font-semibold ">Access Anytime</h3>
        <p className="text-cream text-sm md:text-base">
          think work and create.
        </p>
      </div>
    </div>
  </div>
</section>
      <Footer />
    </div>
  );
};

export default Main;
