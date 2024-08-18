'use client'

import Header from './components/Header';
import StartButton from './components/StartButton';
import Image from "next/image";
import { useEffect } from 'react'
import BasicButton from './components/BasicButton';
import ProButton from './components/ProButton';
import DashButton from './components/DashButton';
import Footer from './components/Footer';
import videoDemo from '../videos/Hackathon-edit-2.mp4'
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <div class="h-screen bg-white">
      <div className="bg-white text-gray-800 text-center hidden sm:block" id="title">
        <h1 className="text-8xl sm:text-8xl md:text-9xl lg:text-9xl xl:text-9xl">EmberCraft</h1>
      </div>

      <Header />

      <div class="grid bg-white h-min-[20rem] grid-cols-1 gap-4 md:grid-cols-2" id="landing">
        <div class="p-4 col-span-1 md:col-span-1 text-center flex flex-col justify-center">
          <h1 class="text-3xl hover:translate-x-1 transform transition duration-200">Crafting harmony</h1>
          <h1 class="text-3xl p-6 hover:translate-x-1 transform transition duration-200">in every digital moment.</h1>
          <h4>We are not just a product - <br /> we are your other half to come up <br /> with a design that is truly yours.</h4>
          <div class="p-6"><StartButton /></div>
        </div>
        <div class="p-0 md:p-4 col-span-1 md:col-span-1 flex justify-center items-center">
          <video className="w-full h-auto object-cover rounded-2xl" autoplay muted controls>
            <source src={videoDemo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="grid bg-white grid-cols-1 gap-4 md:grid-cols-2" id="features">
        <div className="p-4 flex justify-center items-center">
          <img
            class="w-full h-auto md:h-full object-cover rounded-2xl"
            src="https://images.unsplash.com/photo-1459664018906-085c36f472af?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Decorative"
          />
        </div>
        <ul className="p-4 text-center md:text-left flex flex-col justify-center divide-y divide-solid divide-neutral-400">
          <li className="text-2xl p-6 hover:-translate-x-1 transform transition duration-200">Content Optimization</li>
          <li className="text-2xl p-6 hover:-translate-x-1 transform transition duration-200">Text Refinement</li>
          <li className="text-2xl p-6 hover:-translate-x-1 transform transition duration-200">Mobile Responsiveness</li>
          <li className="text-2xl p-6 hover:-translate-x-1 transform transition duration-200">Intuitive Process</li>
        </ul>
      </div>

      <SignedOut>
        <div class="grid bg-white grid-cols-1 gap-4 flex-col divide-x divide-solid divide-neutral-400 md:grid-cols-8" id="pricing">
          <div class="p-4 col-span-4 text-center flex flex-col grow justify-center">
            <h1 class="text-3xl p-6">Basic<br /></h1>
            <ul class="p-4 text-center flex flex-col justify-center divide-y divide-solid divide-neutral-400">
              <li class="text-lg p-6 hover:-translate-y-1 hover:scale-105 transform transition duration-200">Basic thing<br /></li>
              <li class="text-lg p-6 hover:-translate-y-1 hover:scale-105 transform transition duration-200">Basic thing<br /></li>
              <li class="text-lg p-6 hover:-translate-y-1 hover:scale-105 transform transition duration-200">Basic thing<br /></li>
            </ul>

            <h1 class="text-lg font-semibold line-through">$1.99 monthly</h1>
            <h1 class="text-lg font-semibold">Free for a limited time!</h1>
            <h1 class="text-sm">Click below to get started</h1>
            <div class="p-4"><BasicButton /></div>

          </div>
          <div class="p-4 col-span-4 text-center flex flex-col justify-center">
            <h1 class="text-3xl p-6">Pro<br /></h1>
            <ul class="p-4 text-center flex flex-col justify-center divide-y divide-solid divide-neutral-400">
              <li class="text-lg p-6 hover:-translate-y-1 hover:scale-105 transform transition duration-200">Pro thing<br /></li>
              <li class="text-lg p-6 hover:-translate-y-1 hover:scale-105 transform transition duration-200">Pro thing<br /></li>
              <li class="text-lg p-6 hover:-translate-y-1 hover:scale-105 transform transition duration-200">Pro thing<br /></li>
            </ul>
            <h1 class="text-lg font-semibold line-through">$4.99 monthly</h1>
            <h1 class="text-lg font-semibold">Free for a limited time!</h1>
            <h1 class="text-sm">Click below to get started</h1>
            <div class="p-4"><ProButton /></div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div class="grid bg-white grid-cols-1 gap-4 flex-col divide-x divide-solid divide-neutral-400 md:grid-cols-8" id="pricing">
          <div class="p-4 col-span-8 text-center flex flex-col justify-center">
            <h1 class="text-3xl p-6">You&apos;re all set up!<br/></h1>
            <h1 class="text-md">Click below to go to your dashboard</h1>
            <div class="p-4"><DashButton /></div>
          </div>
        </div>
      </SignedIn>

      <Footer />
    </div>
  );
}