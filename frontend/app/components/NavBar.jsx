"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const MenuList = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ];
  const profileList = [
    { name: "Profile", url: "/profile" },
    { name: "Settings", url: "#" },
    { name: "Sign out", url: "/api/auth/signout" },
  ];

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-black fixed w-full z-10 top-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
            width={32}
            height={32}
          />
          <span className="poppins-head self-center text-2xl font-semibold whitespace-nowrap text-white">
            Collab <span className="text-[#3abcf0]">Connect</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:space-x-8">
          {MenuList.map((item, ind) => (
            <Link key={ind} href={item.url} className="text-white hover:text-blue-500">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center md:order-2 space-x-3 relative">
          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
          ) : session ? (
            <>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={toggleUserDropdown}
              >
                <Image
                  className="w-8 h-8 rounded-full"
                  src={session.user.image}
                  alt="User photo"
                  width={32}
                  height={32}
                />
              </button>
              {isUserDropdownOpen && (
                <div className="z-50 absolute top-full right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {session.user.name}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {session.user.email}
                    </span>
                  </div>
                  <ul className="py-2">
                    {profileList.map((item, ind) => (
                      <li key={ind}>
                        <Link
                          href={item.url}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : status === "loading" ? (
            <div className="w-20 h-8 bg-gray-300 animate-pulse rounded"></div>
          ) : (
            <Link
              href="/signin"
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
            >
              Sign In
            </Link>
          )}

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black w-full p-4">
          {MenuList.map((item, ind) => (
            <Link key={ind} href={item.url} className="block py-2 text-white hover:text-blue-500">
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
