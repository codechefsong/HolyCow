"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { PlayIcon, StarIcon, TrophyIcon } from "@heroicons/react/24/solid";

const LandingPage: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const features = [
    {
      icon: <StarIcon className="h-12 w-12 text-yellow-500" />,
      title: "Manage Your Own Farm",
      description: "Build and expand your dream cow farm from scratch. Breed, care for, and grow your herd.",
    },
    {
      icon: <PlayIcon className="h-12 w-12 text-green-500" />,
      title: "Interactive Gameplay",
      description: "Engage with your cows through feeding, massaging, and caring for their health and happiness.",
    },
    {
      icon: <TrophyIcon className="h-12 w-12 text-blue-500" />,
      title: "Compete Globally",
      description: "Climb the leaderboards, compete with other farmers, and become the top cow tycoon!",
    },
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your interest! We"ll contact you at ${email}`);
    setEmail("");
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl mb-6">Cow Farming Simulator</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            Build, Manage, and Grow Your Ultimate Dairy Empire!
          </p>
          <div className="mt-10 flex justify-center space-x-5">
            <button
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-green-600 hover:bg-green-700 transition"
              onClick={() => router.push("/barns")}
            >
              Play Now
            </button>
            <a
              href="#features"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full shadow-lg text-gray-700 bg-white hover:bg-gray-50 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Your Cow Farming Adventure Awaits
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="max-w-md mx-auto text-center px-4">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Join our newsletter and be the first to know about new features, updates, and exclusive offers!
          </p>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
