"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData } from "@/constants/landing/data"; // Make sure this is a .js file if not using TypeScript

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const displayedData = showAll ? faqData : faqData.slice(0, 5);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="px-4 py-10 w-full mx-auto bg-[#F7F7F7] text-[#404040]">
            <h2 className="text-3xl font-bold text-center mb-6">FAQ Section</h2>

            <div className="space-y-4 mx-auto max-w-2xl">
                {displayedData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white shadow rounded-sm border-[#D4D4D4] overflow-hidden border"
                    >
                        <button
                            onClick={() => toggleOpen(index)}
                            className="w-full text-left px-4 py-4 flex justify-between items-center"
                        >
                            <span className="font-semibold text-lg">{item.question}</span>
                            <span className="text-xl text-[#404040]">
                                {openIndex === index ? "▲" : "▼"}
                            </span>
                        </button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    className="px-4 pb-4 text-gray-600"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p>{item.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
            {faqData.length > 5 && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-6 py-2 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition"
                    >
                        {showAll ? "View less ▲" : "View more ▼"}
                    </button>
                </div>
            )}
        </section>
    );
}
