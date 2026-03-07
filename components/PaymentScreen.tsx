"use client";

import { useState } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";

type PaymentMethod = "upi" | "card" | "cod";

export default function PaymentScreen() {
    const {
        cartItems,
        subtotal,
        shippingFee,
        grandTotal,
        shippingAddress,
        setCurrentStep,
    } = useCheckout();

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        setCurrentStep("success");
    };

    const paymentOptions = [
        { key: "upi" as PaymentMethod, label: "UPI / QR Code", icon: "📱", desc: "Google Pay, PhonePe, BHIM" },
        { key: "card" as PaymentMethod, label: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, Rupay" },
        { key: "cod" as PaymentMethod, label: "Cash on Delivery", icon: "💰", desc: "Pay when you receive" },
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 pb-32">
            <StepIndicator currentStep="payment" />

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-eco-green/10 to-emerald-100 flex items-center justify-center">
                    <span className="text-xl">🔒</span>
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Payment</h1>
                    <p className="text-sm text-gray-400 font-medium">Review your order and pay securely</p>
                </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl card-shadow p-5 mb-3 animate-slide-up">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm">📦</span>
                    <h2 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Order Items</h2>
                </div>
                <div className="space-y-2.5 mb-4">
                    {cartItems.map((item) => (
                        <div key={item.product_id} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-green-50 flex-shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.product_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">{item.product_name}</p>
                                <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-bold text-gray-900">
                                ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                <div className="pt-3 space-y-1.5">
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Subtotal</span><span className="text-gray-600">₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Shipping</span><span className="text-gray-600">₹{shippingFee}</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-gray-900 text-base pt-2">
                        <span>Total</span>
                        <span className="bg-gradient-to-r from-eco-green to-emerald-600 bg-clip-text text-transparent text-lg">
                            ₹{grandTotal.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Shipping Address */}
            {shippingAddress && (
                <div className="bg-white rounded-2xl card-shadow p-5 mb-3 animate-slide-up" style={{ animationDelay: "80ms" }}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-sm">📍</span>
                            <h2 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Delivering To</h2>
                        </div>
                        <button
                            onClick={() => setCurrentStep("shipping")}
                            className="text-xs text-eco-green hover:text-eco-green-dark font-semibold flex items-center gap-0.5 transition-colors"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit
                        </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3.5">
                        <p className="font-bold text-gray-900 text-sm">{shippingAddress.fullName}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{shippingAddress.addressLine1}</p>
                        {shippingAddress.addressLine2 && (
                            <p className="text-sm text-gray-600">{shippingAddress.addressLine2}</p>
                        )}
                        <p className="text-sm text-gray-600">{shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pinCode}</p>
                        <p className="text-xs text-gray-400 mt-1.5">{shippingAddress.phone} · {shippingAddress.email}</p>
                    </div>
                </div>
            )}

            {/* Payment Method */}
            <div className="bg-white rounded-2xl card-shadow p-5 mb-5 animate-slide-up" style={{ animationDelay: "160ms" }}>
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm">💳</span>
                    <h2 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Payment Method</h2>
                </div>
                <div className="space-y-2">
                    {paymentOptions.map((m) => (
                        <label
                            key={m.key}
                            className={`flex items-center gap-3.5 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentMethod === m.key
                                ? "border-eco-green bg-eco-green/5 shadow-sm shadow-eco-green/10"
                                : "border-gray-100 hover:border-eco-green/30 hover:bg-gray-50"
                                }`}
                        >
                            <input
                                type="radio"
                                name="payment"
                                value={m.key}
                                checked={paymentMethod === m.key}
                                onChange={() => setPaymentMethod(m.key)}
                                className="accent-eco-green w-4 h-4"
                            />
                            <span className="text-2xl w-8 text-center">{m.icon}</span>
                            <div>
                                <p className="text-sm font-bold text-gray-800">{m.label}</p>
                                <p className="text-[11px] text-gray-400">{m.desc}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Security */}
            <div className="flex items-center justify-center gap-4 text-[11px] text-gray-300 mb-5">
                <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    SSL Encrypted
                </div>
                <div className="w-0.5 h-3 bg-gray-200 rounded-full" />
                <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified Secure
                </div>
            </div>

            {/* Buttons */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md pt-4 pb-6 px-4 border-t border-gray-100 z-10">
                <div className="max-w-2xl mx-auto flex gap-3">
                    <button
                        onClick={() => setCurrentStep("shipping")}
                        className="flex-1 bg-white border-2 border-gray-200 text-gray-500 font-bold py-4 rounded-2xl hover:border-eco-green hover:text-eco-green transition-all duration-200 text-sm card-shadow"
                    >
                        ← Back
                    </button>
                    <button
                        onClick={handlePay}
                        disabled={loading}
                        className="flex-[2] bg-gradient-to-r from-eco-green to-emerald-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-base flex items-center justify-center gap-2 btn-glow disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        {loading ? (
                            <>
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Processing…
                            </>
                        ) : (
                            <>🔒 Pay ₹{grandTotal.toLocaleString("en-IN")}</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
