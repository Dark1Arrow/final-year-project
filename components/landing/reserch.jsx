// HowItWorksSlider.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reserch } from "@/constants/landing/data";

export default function HowItWorksSlider() {
  const [index, setIndex] = useState(0);
  const length = reserch.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, 3000);
    return () => clearInterval(timer);
  }, [length]);

  return (
    <section className="m-20">
       <h2 className=' mb-20 text-4xl font-bold text-[#211334]'>Real-World Evidence & Studies</h2>

      <div className="relative w-full mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100 rounded-xl pl-20 pr-20 flex flex-col md:flex-row-reverse justify-between items-center"
          >
            <img
              src={reserch[index].img}
              alt={reserch[index].title}
              className="w-[400px] md:[700px] mb-4 md:mb-0 md:mr-6"
            />
            <div className="w-[50%]">
              <h3 className="text-3xl font-bold mb-2">
                {reserch[index].title}
              </h3>
              <p className="text-lg font-semibold text-[#7E7E7E]">{reserch[index].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {reserch.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-green-600 scale-125" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
