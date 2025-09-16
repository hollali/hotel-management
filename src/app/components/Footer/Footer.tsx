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
            src="/skyinn.png" // place your logo in the /public folder
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
            <div className="flex items-center py-2">
              <BsMapFill className="text-tertiary-light dark:text-tertiary-dark" />
              <p className="ml-2">Accra, Ghana</p>
            </div>
            <div className="flex items-center py-2">
              <BsFillSendFill className="text-tertiary-light dark:text-tertiary-dark" />
              <p className="ml-2">Hollali</p>
            </div>
            <div className="flex items-center py-2">
              <BsTelephoneOutbound className="text-tertiary-light dark:text-tertiary-dark" />
              <p className="ml-2">+233 0243658631</p>
            </div>
            <div className="flex items-center py-2">
              <BiMessageDetail className="text-tertiary-light dark:text-tertiary-dark" />
              <p className="ml-2">Hollali</p>
            </div>
          </div>

          {/* Links 1 */}
          <div className="flex-1 min-w-[180px] md:text-right">
            <p className="pb-2 hover:text-tertiary-light dark:hover:text-tertiary-dark cursor-pointer">
              Our Story
            </p>
            <p className="pb-2 hover:text-tertiary-light dark:hover:text-tertiary-dark cursor-pointer">
              Get in Touch
            </p>
            <p className="pb-2 hover:text-tertiary-light dark:hover:text-tertiary-dark cursor-pointer">
              Our Privacy
            </p>
            <p className="pb-2 hover:text-tertiary-light dark:hover:text-tertiary-dark cursor-pointer">
              Terms of Service
            </p>
            <p className="hover:text-tertiary-light  dark:hover:text-tertiary-dark cursor-pointer">
              Customer Support
            </p>
          </div>

          {/* Links 2 */}
          <div className="flex-1 min-w-[180px] md:text-right">
            <p className="pb-2 hover:text-tertiary-light dark:hover:text-tertiary-dark cursor-pointer">
              Dining Experience
            </p>
            <p className="pb-2 hover:text-tertiary-light  dark:hover:text-tertiary-dark cursor-pointer">
              Wellness
            </p>
            <p className="pb-2 hover:text-tertiary-light dark:hover:text-tertiary-dark cursor-pointer">
              Fitness
            </p>
            <p className="pb-2 hover:text-tertiary-light dark:hover:text-tertiary-dark cursor-pointer">
              Sports
            </p>
            <p className="hover:text-tertiary-light dark:hover:text-tertiary-dark cursor-pointer">
              Events
            </p>
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
