"use client"; 
import React from "react";
import { motion } from "framer-motion";
import { FileText, Zap, ShieldCheck } from "lucide-react"; // Importing icons

const HeroSection = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4 text-center relative font-mono">
      <nav className="absolute top-0 w-full flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-lg font-semibold">ChatUr-Bot</h1>
        <div className="space-x-4">
          <button className="text-gray-300 hover:text-white">Log in</button>
          <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-300">
            Get Started
          </button>
        </div>
      </nav>

      <div className="mt-48 text-center mb-28">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800 text-gray-300 px-3 py-1 rounded-full text-sm my-8"
        >
          🚀 Introducing ChatUr-Bot
        </motion.span>
        <h2 className="text-6xl font-bold mt-14">
          Get Output from <br /> RAG-Based ChatBot
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Give PDFs as input and then play with it and get desired output.
        </p>
        <div className="mt-6 space-x-4">
          <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-300">
            Start Chatting
          </button>
        </div>
      </div>
      <div className="w-full border-t border-gray-800 my-12"></div>

      {/* Text Feature Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center mt-28 mb-12"
      >
        <h3 className="text-3xl font-semibold mb-4">Why Choose ChatUr-Bot?</h3>
        <p className="text-gray-400 text-lg">
          Experience the power of AI with secure, fast, and intelligent PDF
          processing. Get insights in seconds and streamline your workflow.
        </p>
      </motion.div>

      {/* Feature Section with Scroll Animation */}
      <div className="mt-24 max-w-6xl w-full flex space-x-6 px-6 pb-12">
        {[
          {
            icon: <FileText className="text-gray-400 w-10 h-10 mx-auto" />,
            title: "PDF Processing",
            desc: "Easily process and extract data from PDF files.",
          },
          {
            icon: <Zap className="text-gray-400 w-10 h-10 mx-auto" />,
            title: "Instant Response",
            desc: "Get lightning-fast replies powered by AI.",
          },
          {
            icon: <ShieldCheck className="text-gray-400 w-10 h-10 mx-auto" />,
            title: "Fast & Secure",
            desc: "Your data remains safe with end-to-end encryption.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-black border border-white border-opacity-30 p-8 rounded-lg text-center shadow-lg min-w-[300px]"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-2xl gray-300 font-semibold">{feature.title}</h3>
            <p className="text-gray-400 mt-3 text-lg">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-24 w-full py-6 text-center border-t border-gray-800 text-gray-400 text-lg">
        &copy; 2025 ChatUr-Bot. All rights reserved.
      </footer>
    </div>
  );
};

export default HeroSection;
