"use client";

import { useCheckout } from "@/context/CheckoutContext";
import CartItemCard from "@/components/CartItemCard";
import StepIndicator from "@/components/StepIndicator";

export default function CartScreen() {
    const { cartItems, subtotal, shippingFee, grandTotal, setCurrentStep } =
        useCheckout();

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <StepIndicator currentStep="cart" />

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-eco-green/10 to-emerald-100 flex items-center justify-center">
                    <span className="text-xl">🛒</span>
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Your Cart</h1>
                    <p className="text-sm text-gray-400 font-medium">
                        {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} · Ready to checkout
                    </p>
                </div>
            </div>

            {/* Cart Items */}
            {cartItems.length === 0 ? (
                <div className="text-center py-16 mb-6 animate-fade-in">
                    <div className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                        <span className="text-4xl animate-float">🛒</span>
                    </div>
                    <p className="text-gray-500 font-semibold text-lg">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Looks like you haven&apos;t added anything yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-3 mb-6">
                    {cartItems.map((item, i) => (
                        <div
                            key={item.product_id}
                            className="animate-slide-up"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <CartItemCard item={item} />
                        </div>
                    ))}
                </div>
            )}

            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl card-shadow p-5 mb-5">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm">📋</span>
                    <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider">
                        Order Summary
                    </h2>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Subtotal</span>
                        <span className="font-medium text-gray-700">₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Shipping</span>
                        <span className="font-medium text-gray-700">
                            {shippingFee === 0 ? (
                                <span className="text-eco-green">FREE</span>
                            ) : (
                                `₹${shippingFee}`
                            )}
                        </span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1" />
                    <div className="flex justify-between font-extrabold text-gray-900 text-lg pt-1">
                        <span>Total</span>
                        <span className="bg-gradient-to-r from-eco-green to-emerald-600 bg-clip-text text-transparent">
                            ₹{grandTotal.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Eco badge */}
            <div className="flex items-center gap-2.5 text-xs bg-gradient-to-r from-eco-green/5 to-emerald-50/50 border border-eco-green/10 rounded-2xl px-4 py-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-eco-green/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-base">🌿</span>
                </div>
                <div>
                    <p className="text-eco-green font-semibold text-xs">Eco-Friendly Order</p>
                    <p className="text-gray-400 text-[11px]">100% sustainable products — your purchase plants a tree!</p>
                </div>
            </div>

            {/* CTA */}
            <button
                onClick={() => setCurrentStep("shipping")}
                disabled={cartItems.length === 0}
                className="w-full bg-gradient-to-r from-eco-green to-emerald-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-base flex items-center justify-center gap-2 btn-glow disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
            >
                Proceed to Checkout
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </button>
        </div>
    );
}
