"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

import ThemeContext from "@/app/context/themeContext";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="py-6 px-4 container mx-auto flex items-center justify-between relative">
      {/* Mobile: Hamburger Left */}
      <button
        className="md:hidden text-2xl z-50"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Logo: Center on mobile, Left on desktop */}
      <Link
        href="/"
        className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none"
      >
        <Image
          src="/skyinn.png" // save your Sky Inn logo in /public
          alt="Sky Inn Logo"
          width={120}
          height={50}
          className="object-contain"
          priority
        />
      </Link>

      {/* Desktop Nav: Center */}
      <ul className="hidden md:flex items-center justify-center flex-1 space-x-8">
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

      {/* Right: Icons */}
      <div className="flex items-center space-x-3 ml-auto">
        <Link href="/auth">
          <FaUserCircle className="cursor-pointer text-xl md:text-2xl" />
        </Link>
        {darkTheme ? (
          <MdOutlineLightMode
            className="cursor-pointer text-xl md:text-2xl"
            onClick={() => {
              setDarkTheme(false);
              localStorage.removeItem("hotel-theme");
            }}
          />
        ) : (
          <MdDarkMode
            className="cursor-pointer text-xl md:text-2xl"
            onClick={() => {
              setDarkTheme(true);
              localStorage.setItem("hotel-theme", "true");
            }}
          />
        )}
      </div>

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
        </div>
      )}
    </header>
  );
};

export default Header;
