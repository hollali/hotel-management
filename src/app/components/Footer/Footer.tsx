import Link from "next/link";
import Image from "next/image";
import { BsFillSendFill, BsMapFill, BsTelephoneOutbound } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 py-10">
        {/* Logo */}
        <Link href="/" className="inline-block">
          <Image
            src="/skyinn.png"
            alt="Sky Inn Logo"
            width={50}
            height={20}
            className="object-contain"
            priority
          />
        </Link>

        {/* Title */}
        <h4 className="font-semibold text-2xl md:text-3xl py-6 text-gray-800 dark:text-gray-100">
          Contact
        </h4>

        {/* Content */}
        <div className="flex flex-wrap gap-10 md:gap-16 items-start justify-between text-gray-600 dark:text-gray-300">
          {/* Contact Section */}
          <div className="flex-1 min-w-[220px]">
            <Link
              href="https://maps.google.com/?q=Accra,+Ghana"
              target="_blank"
              className="flex items-center py-2 hover:text-tertiary-light dark:hover:text-tertiary-dark"
            >
              <BsMapFill className="text-tertiary-light dark:text-tertiary-dark" />
              <span className="ml-2">Accra, Ghana</span>
            </Link>

            <Link
              href="mailto:hollali@example.com"
              className="flex items-center py-2 hover:text-tertiary-light dark:hover:text-tertiary-dark"
            >
              <BsFillSendFill className="text-tertiary-light dark:text-tertiary-dark" />
              <span className="ml-2">hollali@example.com</span>
            </Link>

            <Link
              href="tel:+233243658631"
              className="flex items-center py-2 hover:text-tertiary-light dark:hover:text-tertiary-dark"
            >
              <BsTelephoneOutbound className="text-tertiary-light dark:text-tertiary-dark" />
              <span className="ml-2">+233 0243658631</span>
            </Link>

            <Link
              href="/contact"
              className="flex items-center py-2 hover:text-tertiary-light dark:hover:text-tertiary-dark"
            >
              <BiMessageDetail className="text-tertiary-light dark:text-tertiary-dark" />
              <span className="ml-2">Chat with us</span>
            </Link>
          </div>

          {/* Links */}
          <div className="flex-1 min-w-[180px] md:text-right">
            <Link
              href="/rooms"
              className="block pb-2 hover:text-tertiary-light dark:hover:text-tertiary-dark"
            >
              Rooms
            </Link>
            <Link
              href="/contact"
              className="block hover:text-tertiary-light dark:hover:text-tertiary-dark"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-tertiary-light dark:bg-tertiary-dark h-12 md:h-[70px] w-full flex items-center justify-center">
        <p className="text-white text-sm md:text-base">
          © {new Date().getFullYear()} SKY INN. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
