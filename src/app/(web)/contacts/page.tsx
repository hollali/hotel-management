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
    <section className="kempinski-container pt-28 pb-16 md:pb-24">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="section-title mb-4">Contact Us</h1>
        <p className="section-subtitle mx-auto">
          We would love to hear from you. Get in touch with us for any inquiries or reservations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <h2 className="font-heading text-2xl font-medium mb-8 text-stellar-blue">Get In Touch</h2>
          <div className="space-y-6">
            <Link
              href="https://maps.google.com/?q=Accra,+Ghana"
              target="_blank"
              className="flex items-center gap-4 text-stellar-grey hover:text-brand transition-colors"
            >
              <BsMapFill className="text-brand text-xl shrink-0 icon-hover" />
              <span>Accra, Ghana</span>
            </Link>
            <Link
              href="mailto:hollali@example.com"
              className="flex items-center gap-4 text-stellar-grey hover:text-brand transition-colors"
            >
              <BsFillSendFill className="text-brand text-xl shrink-0 icon-hover" />
              <span>hollali@example.com</span>
            </Link>
            <Link
              href="tel:+233243658631"
              className="flex items-center gap-4 text-stellar-grey hover:text-brand transition-colors"
            >
              <BsTelephoneOutbound className="text-brand text-xl shrink-0 icon-hover" />
              <span>+233 0243658631</span>
            </Link>
            <div className="flex items-center gap-4 text-stellar-grey">
              <BiMessageDetail className="text-brand text-xl shrink-0 icon-pulse" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-medium mb-8 text-stellar-blue">Send Us a Message</h2>
          {submitted ? (
            <div className="bg-beige border border-brand/30 text-stellar-blue p-6 text-center rounded-2xl">
              <p className="font-heading text-lg mb-2">Thank You!</p>
              <p className="text-stellar-grey text-sm">Your message has been sent successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-[0.08em] text-stellar-grey mb-1.5 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-stellar-light-grey px-4 py-3 bg-transparent text-stellar-blue focus:outline-none focus:border-brand transition-colors text-sm rounded-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-[0.08em] text-stellar-grey mb-1.5 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-stellar-light-grey px-4 py-3 bg-transparent text-stellar-blue focus:outline-none focus:border-brand transition-colors text-sm rounded-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-[0.08em] text-stellar-grey mb-1.5 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full border border-stellar-light-grey px-4 py-3 bg-transparent text-stellar-blue focus:outline-none focus:border-brand transition-colors text-sm resize-none rounded-2xl"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-primary px-8 py-3 text-sm"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        <h2 className="font-heading text-2xl font-medium mb-8 text-center text-stellar-blue">Our Location</h2>
        <div className="bg-beige h-80 flex items-center justify-center border border-stellar-light-grey">
          <p className="text-stellar-grey">Map will be displayed here</p>
        </div>
      </div>
    </section>
  );
};

export default ContactsPage;
