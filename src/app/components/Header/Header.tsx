"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/contacts", label: "Contact" },
];

const Header = () => {
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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isHome = pathname === "/";

  const allLinks = [
    ...navLinks,
    ...(isSignedIn ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/10 backdrop-blur-md shadow-sm"
          : isHome
            ? "bg-gradient-to-b from-black/40 to-transparent"
            : "bg-transparent"
      }`}
    >
      <div className="kempinski-container flex items-center justify-between h-20">
        <button
          className={`md:hidden p-2 -ml-2 transition-colors ${
            scrolled || !isHome ? "text-stellar-blue" : "text-white"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={22} /> : <HiOutlineMenuAlt3 size={24} />}
        </button>

        <Link href="/" className="flex-shrink-0">
          <Image
            src="/skyinn.png"
            alt="Sky Inn Logo"
            width={60}
            height={24}
            className={`object-contain h-10 md:h-12 w-auto transition-all ${
              scrolled || !isHome ? "" : "brightness-0 invert"
            }`}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium tracking-[0.02em] transition-colors hover-underline ${
                isActive(link.href)
                  ? scrolled || !isHome
                    ? "text-brand"
                    : "text-white"
                  : scrolled || !isHome
                    ? "text-stellar-grey hover:text-stellar-blue"
                    : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isSignedIn && (
            <Link
              href="/dashboard"
              className={`px-4 py-2 text-sm font-medium tracking-[0.02em] transition-colors hover-underline ${
                scrolled || !isHome
                  ? "text-stellar-grey hover:text-stellar-blue"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className={`hidden sm:flex items-center gap-2 text-sm font-medium ${
                scrolled || !isHome ? "text-stellar-blue" : "text-white"
              }`}
            >
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.fullName || "User"}
                  width={28}
                  height={28}
                  className="rounded-full ring-2 ring-brand/30"
                />
              ) : (
                <span className="text-brand">{user?.fullName || "Account"}</span>
              )}
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button
                className={`hidden sm:block text-sm font-medium tracking-[0.02em] transition-colors hover-underline ${
                  scrolled || !isHome ? "text-stellar-grey hover:text-stellar-blue" : "text-white/80 hover:text-white"
                }`}
              >
                Sign In
              </button>
            </SignInButton>
          )}

          <Link
            href="/rooms"
            className={`btn-primary-white text-xs md:text-sm px-4 md:px-7 py-2 md:py-3 ${
              scrolled || !isHome
                ? "!border-stellar-blue !text-stellar-blue hover:!bg-stellar-blue hover:!text-white"
                : ""
            }`}
          >
            Book Now
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-stellar-light-grey animate-fade-down">
          <div className="kempinski-container py-4 space-y-1">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-brand bg-beige"
                    : "text-stellar-blue hover:bg-beige"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="kempinski-container pb-4 pt-2 border-t border-stellar-light-grey">
            {isSignedIn ? (
              <div className="flex items-center gap-3 px-4 py-2">
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : null}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-stellar-blue">
                    {user?.fullName || user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
                <SignOutButton>
                  <button className="text-sm text-stellar-grey hover:text-brand transition-colors">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="w-full btn-primary justify-center">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
