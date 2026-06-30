"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

import ThemeContext from "@/app/context/themeContext";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  return (
    <header className="py-6 px-4 container mx-auto flex items-center justify-between relative">
      <button
        className="md:hidden text-2xl z-50"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <Link
        href="/"
        className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none"
      >
        <Image
          src="/skyinn.png"
          alt="Sky Inn Logo"
          width={50}
          height={20}
          className="object-contain"
          priority
        />
      </Link>

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
        {isSignedIn && (
          <li className="hover:translate-y-1 duration-300 transition-all">
            <Link href="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>

      <div className="flex items-center space-x-3 ml-auto">
        {isSignedIn ? (
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.fullName || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <FaUserCircle className="cursor-pointer text-xl md:text-2xl" />
              )}
            </Link>
            <SignOutButton>
              <button className="text-sm text-tertiary-light dark:text-tertiary-dark hover:underline">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        ) : (
          <SignInButton mode="modal">
            <FaUserCircle className="cursor-pointer text-xl md:text-2xl" />
          </SignInButton>
        )}
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
          {isSignedIn && (
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-500"
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
