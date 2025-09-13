"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

import ThemeContext from "@/app/context/themeContext";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="py-6 px-4 container mx-auto flex items-center justify-between relative">
      {/* Left: Logo + Icons */}
      <div className="flex items-center w-full md:w-2/3">
        <Link href="/" className="font-black text-xl text-tertiary-light">
          SKY
        </Link>
        <ul className="hidden md:flex items-center ml-5">
          <li className="flex items-center">
            <Link href="/auth">
              <FaUserCircle className="cursor-pointer text-xl" />
            </Link>
          </li>
          <li className="ml-3">
            {darkTheme ? (
              <MdOutlineLightMode
                className="cursor-pointer text-xl"
                onClick={() => {
                  setDarkTheme(false);
                  localStorage.removeItem("hotel-theme");
                }}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer text-xl"
                onClick={() => {
                  setDarkTheme(true);
                  localStorage.setItem("hotel-theme", "true");
                }}
              />
            )}
          </li>
        </ul>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center justify-between w-1/3">
        <li className="hover:translate-y-1 duration-300 transition-all">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:translate-y-1 duration-300 transition-all">
          <Link href="/rooms">Rooms</Link>
        </li>
        <li className="hover:translate-y-1 duration-300 transition-all">
          <Link href="/contacts">Contacts</Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl z-50"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white dark:bg-black flex flex-col items-center justify-center space-y-8 text-xl z-40">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-500"
          >
            Home
          </Link>
          <Link
            href="/rooms"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-500"
          >
            Rooms
          </Link>
          <Link
            href="/contacts"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-500"
          >
            Contacts
          </Link>
          <div className="flex space-x-4 mt-6">
            <Link href="/auth">
              <FaUserCircle className="cursor-pointer text-2xl" />
            </Link>
            {darkTheme ? (
              <MdOutlineLightMode
                className="cursor-pointer text-2xl"
                onClick={() => {
                  setDarkTheme(false);
                  localStorage.removeItem("hotel-theme");
                }}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer text-2xl"
                onClick={() => {
                  setDarkTheme(true);
                  localStorage.setItem("hotel-theme", "true");
                }}
              />
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
