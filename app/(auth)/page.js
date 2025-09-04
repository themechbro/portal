"use client";

import GetStartedModal from "../components/getStartedModal";
import LandingNavbar from "../components/landing_nav";
import { useState } from "react";
export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <main className="min-h-screen flex flex-col">
      <LandingNavbar />
      {/* ✅ Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-24">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Secure Your Intellectual Property with Ease
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10">
            File your{" "}
            <span className="font-semibold">
              Patents, Copyrights, Trademarks,
            </span>
            and <span className="font-semibold">Designs</span> — all in one
            place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-8 py-4 rounded-xl bg-white text-indigo-700 font-semibold shadow-lg hover:bg-gray-100 transition"
              onClick={() => setOpen(true)}
            >
              Get Started
            </button>
            <button className="px-8 py-4 rounded-xl border border-white text-white font-semibold hover:bg-white hover:text-indigo-700 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We make intellectual property filing simple, fast, and transparent.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="text-indigo-600 text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast Filing</h3>
            <p className="text-gray-600">
              Submit your documents online in just a few clicks — no delays.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="text-indigo-600 text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
            <p className="text-gray-600">
              Our legal experts ensure your applications are accurate and
              strong.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="text-indigo-600 text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
            <p className="text-gray-600">
              Transparent and competitive fees without hidden costs.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Testimonials Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by startups, innovators, and businesses worldwide.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-gray-50 shadow-md rounded-2xl p-6 hover:shadow-xl transition">
            <p className="text-gray-700 mb-4">
              “The filing process was smooth and super easy. Highly
              recommended!”
            </p>
            <h4 className="font-semibold text-gray-900">
              — Ananya, Startup Founder
            </h4>
          </div>
          <div className="bg-gray-50 shadow-md rounded-2xl p-6 hover:shadow-xl transition">
            <p className="text-gray-700 mb-4">
              “Great support team! They guided me through my trademark filing.”
            </p>
            <h4 className="font-semibold text-gray-900">— Raj, Entrepreneur</h4>
          </div>
          <div className="bg-gray-50 shadow-md rounded-2xl p-6 hover:shadow-xl transition">
            <p className="text-gray-700 mb-4">
              “Affordable and transparent pricing — no hidden charges.”
            </p>
            <h4 className="font-semibold text-gray-900">— Priya, Designer</h4>
          </div>
        </div>
      </section>

      {/* ✅ Call to Action Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Protect Your Ideas?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Start your intellectual property filing journey today.
        </p>
        <button className="px-8 py-4 rounded-xl bg-white text-indigo-700 font-semibold shadow-lg hover:bg-gray-100 transition">
          Get Started Now
        </button>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
        <p>
          © {new Date().getFullYear()} IP Filing Portal. All rights reserved.
        </p>
      </footer>

      <GetStartedModal open={open} close={() => setOpen(false)} />
    </main>
  );
}
