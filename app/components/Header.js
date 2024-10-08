import { SignedIn, SignedOut, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useEffect, useState, useRef } from "react";
import Link from 'next/link'

export default function Header(){
    const [isSticky, setIsSticky] = useState(false);
    const [navHeight, setNavHeight] = useState(0);
    const navRef = useRef(null);
    const placeholderRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (navRef.current && placeholderRef.current) {
                const navTop = navRef.current.getBoundingClientRect().top;

                // Make the navbar sticky when its top reaches the top of the viewport
                if (navTop <= 0) {
                    setIsSticky(true);
                }

                // If the user scrolls back up and the placeholder is in view, remove the sticky class
                if (window.scrollY < placeholderRef.current.offsetTop) {
                    setIsSticky(false);
                }
            }
        };

        const updateNavHeight = () => {
            if (navRef.current) {
                setNavHeight(navRef.current.offsetHeight);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", updateNavHeight);

        updateNavHeight(); // Initialize the navbar height on component mount

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateNavHeight);
        };
    }, []);

    return (
        <header>
            {/* Placeholder div to hold space when navbar becomes sticky */}
            <div ref={placeholderRef} style={{ height: isSticky ? `${navHeight}px` : 'auto' }} />
            <nav 
                ref={navRef}
                class={`bg-white border-gray-600 border-solid border-b-2 px-6 lg:px-6 py-2.5 dark:bg-gray-800 transition-all duration-300 ${
                    isSticky ? 'fixed top-0 left-0 w-full z-50 shadow-md' : ''
                }`}
            >
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link href="/" class="flex items-center">
                        <img src="https://www.svgrepo.com/show/375811/flame.svg" class="mr-3 h-6 sm:h-9" alt="Logo" />
                        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">EmberCraft</span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <SignedOut>
                            <Link href="/sign-in" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</Link>
                            <Link href="/sign-up" className="text-gray-950 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Sign Up</Link>
                        </SignedOut>
                        <SignedIn>
                            <div class="pl-4 pr-4 space-x-4 align-middle text-center items-center flex flex-row">
                                <SignOutButton />
                                <UserButton />
                            </div>
                        </SignedIn>
                            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <SignedIn>
                                <li>
                                    <Link href="/dashboard" class="block py-2 pr-4 pl-3 text-gray-700 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Dashboard</Link>
                                </li>
                            </SignedIn>
                            <li>
                                <Link href="/#features" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</Link>
                            </li>
                            <li>
                                <Link href="/#pricing" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Pricing</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
