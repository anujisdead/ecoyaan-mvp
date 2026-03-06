"use client";

import { motion } from "framer-motion";
import { CheckoutStep } from "@/lib/types";

interface StepIndicatorProps {
    currentStep: CheckoutStep;
}

const STEPS: { key: CheckoutStep; label: string; num: number }[] = [
    { key: "cart", label: "Cart", num: 1 },
    { key: "shipping", label: "Shipping", num: 2 },
    { key: "payment", label: "Payment", num: 3 },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
    const stepIndex = STEPS.findIndex((s) => s.key === currentStep);

    return (
        <div className="flex items-center justify-center gap-0 mb-10 mt-4 px-4">
            {STEPS.map((step, i) => {
                const isActive = i === stepIndex;
                const isCompleted = i < stepIndex;

                return (
                    <div key={step.key} className="flex items-center">
                        <div className="flex flex-col items-center">
                            {/* Circle */}
                            <motion.div
                                className="relative flex items-center justify-center"
                                animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                                transition={isActive ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
                            >
                                <motion.div
                                    className="w-11 h-11 rounded-[14px] flex items-center justify-center text-sm font-bold relative overflow-hidden"
                                    animate={{
                                        background: isActive || isCompleted
                                            ? "linear-gradient(135deg, #22c55e, #059669)"
                                            : "#f8fafc",
                                        color: isActive || isCompleted ? "#ffffff" : "#cbd5e1",
                                        borderWidth: isActive || isCompleted ? 0 : 1.5,
                                        borderColor: "#e2e8f0",
                                    }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    style={{
                                        boxShadow: isActive
                                            ? "0 4px 14px rgba(34,197,94,0.3)"
                                            : isCompleted
                                                ? "0 2px 8px rgba(34,197,94,0.2)"
                                                : "0 1px 3px rgba(0,0,0,0.04)",
                                    }}
                                >
                                    {isCompleted ? (
                                        <motion.svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 0.4, delay: 0.1 }}
                                        >
                                            <motion.path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.4, ease: "easeOut" }}
                                            />
                                        </motion.svg>
                                    ) : (
                                        <span className="text-[13px]">{step.num}</span>
                                    )}
                                </motion.div>

                                {/* Active ring */}
                                {isActive && (
                                    <motion.div
                                        className="absolute -inset-[5px] rounded-[18px] border-2 border-green-400/30"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: [0, 0.6, 0], scale: [0.95, 1.05, 0.95] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                )}
                            </motion.div>

                            {/* Label */}
                            <motion.span
                                className="mt-2 text-[11px] font-bold tracking-wide"
                                animate={{
                                    color: isActive ? "#16a34a" : isCompleted ? "#22c55e" : "#cbd5e1",
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {step.label}
                            </motion.span>
                        </div>

                        {/* Connector */}
                        {i < STEPS.length - 1 && (
                            <div className="relative w-14 sm:w-20 h-[3px] mx-3 mb-6 rounded-full bg-slate-100 overflow-hidden">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                    initial={false}
                                    animate={{ width: isCompleted ? "100%" : "0%" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
