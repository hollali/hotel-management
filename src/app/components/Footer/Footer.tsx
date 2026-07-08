"use client";

import Link from "next/link";
import Image from "next/image";
import { BsFillSendFill, BsMapFill, BsTelephoneOutbound, BsArrowUp } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-stellar-blue text-white">
      <div className="kempinski-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/skyinn.png"
                alt="Sky Inn Logo"
                width={60}
                height={24}
                className="object-contain brightness-0 invert h-12 w-auto"
                priority
              />
            </Link>
            <p className="text-stellar-grey text-sm leading-relaxed max-w-xs">
              Experience luxury and comfort in the heart of Ghana. Your perfect stay awaits at Sky Inn Hotel.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-6 text-brand">Contact</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://maps.google.com/?q=Accra,+Ghana"
                  target="_blank"
                  className="flex items-center gap-3 text-stellar-grey hover:text-brand transition-colors text-sm"
                >
                  <BsMapFill className="text-brand shrink-0" />
                  <span>Accra, Ghana</span>
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:hollali@example.com"
                  className="flex items-center gap-3 text-stellar-grey hover:text-brand transition-colors text-sm"
                >
                  <BsFillSendFill className="text-brand shrink-0" />
                  <span>hollali@example.com</span>
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+233243658631"
                  className="flex items-center gap-3 text-stellar-grey hover:text-brand transition-colors text-sm"
                >
                  <BsTelephoneOutbound className="text-brand shrink-0" />
                  <span>+233 0243658631</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-6 text-brand">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/rooms" className="text-stellar-grey hover:text-brand transition-colors text-sm">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-stellar-grey hover:text-brand transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-stellar-grey hover:text-brand transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/dashboard/bookings" className="text-stellar-grey hover:text-brand transition-colors text-sm">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-6 text-brand">Reservations</h4>
            <p className="text-stellar-grey text-sm mb-4">
              Book directly for the best rates and exclusive benefits.
            </p>
            <Link href="/rooms" className="btn-primary text-sm">
              Book Your Stay
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="kempinski-container flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <p className="text-stellar-grey text-xs">
            &copy; {new Date().getFullYear()} Sky Inn Hotel. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-stellar-grey">
            <Link href="/" className="hover:text-brand transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-brand transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-brand transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-brand text-white flex items-center justify-center hover:bg-stellar-blue transition-colors"
        aria-label="Back to top"
      >
        <BsArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
