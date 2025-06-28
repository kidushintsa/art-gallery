"use client";

import type React from "react";

import { useState } from "react";
import { Palette } from "lucide-react";
import FeatureCard from "@/custom-components/feature-card";
import { features } from "@/data/features-about";

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simple form submission (you can add your email logic here)
    console.log("Form submitted:", formData);

    // Reset form
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
      alert("Message sent successfully!");
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-1/4 w-20 h-20 bg-indigo-100 rounded-full opacity-30 blur-xl"></div>
            <div className="absolute top-5 right-1/3 w-16 h-16 bg-purple-100 rounded-full opacity-40 blur-lg"></div>
            <div className="absolute bottom-5 left-1/3 w-24 h-24 bg-blue-100 rounded-full opacity-25 blur-2xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                <Palette className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              About Us
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6 rounded-full"></div>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We are passionate about connecting art lovers with talented
              artists, creating a vibrant community where creativity flourishes
              and beautiful artworks find their perfect homes.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="bg-indigo-50 rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To provide a platform where artists can showcase their creativity
              and art enthusiasts can discover unique pieces that speak to their
              souls. We believe art has the power to transform spaces, inspire
              emotions, and bring people together.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              bgColor={feature.bgColor}
              iconColor={feature.iconColor}
            />
          ))}
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              Art Gallery was born from a simple idea: to make beautiful art
              accessible to everyone. Founded in 2024, we started as a small
              platform with a big dream - to connect talented artists with
              people who appreciate their work.
            </p>
            <p className="mb-6">
              What began as a passion project has grown into a thriving
              marketplace where creativity meets commerce. We&apos;ve helped
              hundreds of artists share their work with the world and assisted
              countless customers in finding the perfect piece for their space.
            </p>
            <p>
              Today, we continue to grow and evolve, always staying true to our
              core mission of celebrating art and supporting the creative
              community. Every purchase you make helps an artist continue their
              creative journey.
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Have questions or want to learn more about our artists? We&apos;d
            love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
