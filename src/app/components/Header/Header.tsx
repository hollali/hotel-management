"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaUserCircle, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

import ThemeContext from "@/app/context/themeContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/contacts", label: "Contact" },
];

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const allLinks = [
    ...navLinks,
    ...(isSignedIn ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm"
          : "bg-white dark:bg-black"
      }`}
    >
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl relative z-50 p-2 -ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <FaTimes />
          ) : (
            <HiOutlineMenuAlt3 />
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/skyinn.png"
            alt="Sky Inn Logo"
            width={50}
            height={20}
            className="object-contain h-8 md:h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isSignedIn && (
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2"
            >
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.fullName || "User"}
                  width={32}
                  height={32}
                  className="rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                />
              ) : (
                <FaUserCircle className="text-2xl text-gray-500 dark:text-gray-400" />
              )}
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="hidden sm:inline-flex bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Sign In
              </button>
            </SignInButton>
          )}

          {isSignedIn && (
            <SignOutButton>
              <button className="hidden sm:inline-flex text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                Sign Out
              </button>
            </SignOutButton>
          )}

          <button
            onClick={() => {
              setDarkTheme(!darkTheme);
              localStorage.setItem("hotel-theme", darkTheme ? "" : "true");
            }}
            className="p-2 rounded-lg text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {darkTheme ? <MdOutlineLightMode /> : <MdDarkMode />}
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-950 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          <nav className="flex-1 space-y-1">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-3">
            {isSignedIn ? (
              <div className="flex items-center gap-3 px-4">
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-2xl text-gray-400" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user?.fullName || user?.primaryEmailAddress?.emailAddress}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="w-full bg-primary text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            )}

            {isSignedIn && (
              <SignOutButton>
                <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  Sign Out
                </button>
              </SignOutButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
