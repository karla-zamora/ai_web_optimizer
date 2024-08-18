'use client'

import Header from './components/Header';
import StartButton from './components/StartButton';
import Image from "next/image";
import { useEffect } from 'react'
import { createUser, getUser, updateUser, deleteUser } from '@/app/components/api/user'
import { addProject, getProject, updateData, deleteProject } from '@/app/components/api/project'
import BasicButton from './components/BasicButton';
import ProButton from './components/ProButton';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div class="h-screen bg-white">
      <div className="bg-white text-gray-800 text-center hidden sm:block" id="title">
        <h1 className="text-8xl sm:text-8xl md:text-9xl lg:text-9xl xl:text-9xl">EmberCraft</h1>
      </div>

      <Header />

      <div class="grid bg-white h-full grid-cols-1 gap-4 md:grid-cols-2" id="landing">
        <div class="p-4 col-span-1 md:col-span-1 text-center flex flex-col justify-center">
          <h1 class="text-3xl hover:translate-x-1 transform transition duration-200">Crafting harmony</h1>
          <h1 class="text-3xl p-6 hover:translate-x-1 transform transition duration-200">in every digital moment.</h1>
          <h4>We are not just a product - <br /> we are your other half to come up <br /> with a design that is truly yours.</h4>
          <div class="p-6"><StartButton /></div>
        </div>
        <div class="p-0 md:p-4 col-span-1 md:col-span-1 flex justify-center items-center">
          <img
            class="w-full h-auto md:h-full object-cover rounded-2xl"
            src="https://images.unsplash.com/photo-1459664018906-085c36f472af?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Decorative"
          />
        </div>
      </div>

      <div className="grid bg-white h-full grid-cols-1 gap-4 md:grid-cols-2" id="features">
        <div className="p-4 flex justify-center items-center">
          <img
            className="w-full h-auto object-cover rounded-2xl"
            src="https://images.unsplash.com/photo-1712111474888-29e9431241b6?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Feature"
          />
        </div>
        <ul className="p-4 text-center md:text-left flex flex-col justify-center divide-y divide-solid divide-neutral-400">
          <li className="text-2xl p-6 hover:-translate-x-1 transform transition duration-200">Content Optimization</li>
          <li className="text-2xl p-6 hover:-translate-x-1 transform transition duration-200">Text Refinement</li>
          <li className="text-2xl p-6 hover:-translate-x-1 transform transition duration-200">Mobile Responsiveness</li>
          <li className="text-2xl p-6 hover:-translate-x-1 transform transition duration-200">Intuitive Process</li>
        </ul>
      </div>

      <div class="grid bg-white grid-cols-1 gap-4 flex-col divide-x divide-solid divide-neutral-400 md:grid-cols-8" id="pricing">
        <div class="p-4 col-span-4 text-center flex flex-col grow justify-center">
          <h1 class="text-3xl p-6">Basic<br /></h1>
          <ul class="p-4 text-center flex flex-col justify-center divide-y divide-solid divide-neutral-400">
            <li class="text-lg p-6 hover:-translate-y-1 hover:scale-105 transform transition duration-200">Basic thing<br /></li>
            <li class="text-lg p-6 hover:-translate-y-1 hover:scale-105 transform transition duration-200">Basic thing<br /></li>
            <li class="text-lg p-6 hover:-translate-y-1 hover:scale-105 transform transition duration-200">Basic thing<br /></li>
          </ul>
          <div class="p-6"><BasicButton /></div>
        </div>
        <div class="p-4 col-span-4 text-center flex flex-col justify-center">
          <h1 class="text-3xl p-6">Pro<br /></h1>
          <ul class="p-4 text-center flex flex-col justify-center divide-y divide-solid divide-neutral-400">
            <li class="text-lg p-6 hover:-translate-y-1 hover:scale-105 transform transition duration-200">Pro thing<br /></li>
            <li class="text-lg p-6 hover:-translate-y-1 hover:scale-105 transform transition duration-200">Pro thing<br /></li>
            <li class="text-lg p-6 hover:-translate-y-1 hover:scale-105 transform transition duration-200">Pro thing<br /></li>
          </ul>
          <div class="p-6"><ProButton /></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}