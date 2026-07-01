"use client";

import { useState, FormEvent } from "react";
import { BsFillSendFill, BsMapFill, BsTelephoneOutbound } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import Link from "next/link";

const ContactsPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" },
    });
    setSubmitted(true);
    form.reset();
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Contact Us</h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        We would love to hear from you. Get in touch with us for any inquiries or reservations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold mb-6">Get In Touch</h2>
          <div className="space-y-4">
            <Link
              href="https://maps.google.com/?q=Accra,+Ghana"
              target="_blank"
              className="flex items-center py-3 hover:text-tertiary-light dark:hover:text-tertiary-dark"
            >
              <BsMapFill className="text-tertiary-light dark:text-tertiary-dark text-xl" />
              <span className="ml-4">Accra, Ghana</span>
            </Link>
            <Link
              href="mailto:hollali@example.com"
              className="flex items-center py-3 hover:text-tertiary-light dark:hover:text-tertiary-dark"
            >
              <BsFillSendFill className="text-tertiary-light dark:text-tertiary-dark text-xl" />
              <span className="ml-4">hollali@example.com</span>
            </Link>
            <Link
              href="tel:+233243658631"
              className="flex items-center py-3 hover:text-tertiary-light dark:hover:text-tertiary-dark"
            >
              <BsTelephoneOutbound className="text-tertiary-light dark:text-tertiary-dark text-xl" />
              <span className="ml-4">+233 0243658631</span>
            </Link>
            <div className="flex items-center py-3">
              <BiMessageDetail className="text-tertiary-light dark:text-tertiary-dark text-xl" />
              <span className="ml-4">24/7 Customer Support</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
          {submitted ? (
            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-4 rounded-lg text-center">
              Thank you! Your message has been sent.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6 text-center">Our Location</h2>
        <div className="bg-gray-200 dark:bg-gray-700 h-80 rounded-xl flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Map will be displayed here</p>
        </div>
      </div>
    </section>
  );
};

export default ContactsPage;
