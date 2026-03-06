"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartItem } from "@/lib/types";
import { useCheckout } from "@/context/CheckoutContext";

interface CartItemCardProps {
    item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
    const { removeCartItem, updateItemQuantity } = useCheckout();
    const [removing, setRemoving] = useState(false);

    const handleRemove = () => {
        setRemoving(true);
        setTimeout(() => removeCartItem(item.product_id), 400);
    };

    return (
        <AnimatePresence>
            {!removing && (
                <motion.div
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -80, scale: 0.95, height: 0, marginBottom: 0, padding: 0 }}
                    transition={{
                        layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                        exit: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                        default: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    }}
                    className="card card-interactive p-4 group"
                >
                    <div className="flex items-start gap-4">
                        {/* Product Image */}
                        <motion.div
                            className="relative w-[88px] h-[88px] rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 flex-shrink-0"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.25 }}
                        >
                            <img
                                src={item.image}
                                alt={item.product_name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://placehold.co/200x200/f0fdf4/16a34a?text=${encodeURIComponent(item.product_name.split(" ")[0])}`;
                                }}
                            />
                            <div className="badge-eco absolute top-1.5 left-1.5">🌱 ECO</div>
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pt-0.5">
                            <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 mb-1">
                                {item.product_name}
                            </h3>
                            <p className="text-green-600 font-extrabold text-[15px]">
                                ₹{item.product_price.toLocaleString("en-IN")}
                            </p>

                            {/* Quantity */}
                            <div className="flex items-center gap-0 mt-3 bg-slate-50 rounded-xl w-fit border border-slate-100">
                                <motion.button
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => updateItemQuantity(item.product_id, item.quantity - 1)}
                                    className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-l-xl transition-colors duration-200 text-lg font-medium"
                                >
                                    −
                                </motion.button>
                                <motion.span
                                    key={item.quantity}
                                    initial={{ scale: 1.3, opacity: 0.5 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-10 h-9 flex items-center justify-center text-sm font-extrabold text-slate-800 bg-white border-x border-slate-100"
                                >
                                    {item.quantity}
                                </motion.span>
                                <motion.button
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => updateItemQuantity(item.product_id, item.quantity + 1)}
                                    className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-r-xl transition-colors duration-200 text-lg font-medium"
                                >
                                    +
                                </motion.button>
                            </div>
                        </div>

                        {/* Price + Remove */}
                        <div className="flex flex-col items-end justify-between self-stretch min-h-[88px]">
                            <motion.p
                                key={item.product_price * item.quantity}
                                initial={{ y: -4, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="font-extrabold text-slate-900 text-lg tracking-tight"
                            >
                                ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                            </motion.p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleRemove}
                                className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-red-500 transition-colors duration-200"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span className="hidden sm:inline font-semibold">Remove</span>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
