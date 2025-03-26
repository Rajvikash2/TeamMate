"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            width={32}
            height={32}
            alt="Flowbite Logo"
          />
          <span className="text-2xl font-semibold dark:text-white">
            Flowbite
          </span>
        </Link>

        {/* Profile + Hamburger Menu */}
        <div className="flex items-center space-x-3">
          {/* Profile Button */}
          <button
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Image
              src="/docs/images/people/profile-picture-3.jpg"
              width={32}
              height={32}
              className="rounded-full"
              alt="User Photo"
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-16 right-4 z-50 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
              <div className="px-4 py-3">
                <p className="text-sm text-gray-900 dark:text-white">
                  Bonnie Green
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  name@flowbite.com
                </p>
              </div>
              <ul className="py-2">
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/earnings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                  >
                    Earnings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navbar Links */}
        <div
          className={`md:flex items-center justify-between w-full md:w-auto ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 mt-4 border rounded-lg md:border-0 bg-gray-50 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded-md md:bg-transparent md:text-blue-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
