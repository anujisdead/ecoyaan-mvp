"use client";

import { useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";

export default function SuccessScreen() {
    const { orderNumber, grandTotal, shippingAddress, cartItems } = useCheckout();

    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 5);
    const formatted = estimatedDate.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 pb-32">
            {/* Celebration Header */}
            <div className="text-center mb-8 animate-fade-in">
                {/* Animated checkmark */}
                <div className="relative w-24 h-24 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-eco-green/20 to-emerald-100/40 animate-pulse-slow" />
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-eco-green to-emerald-500 flex items-center justify-center shadow-xl shadow-eco-green/30">
                        <svg className="w-10 h-10 text-white animate-check-pop" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
                    Order Placed! 🎉
                </h1>
                <p className="text-sm text-gray-400 max-w-xs mx-auto">
                    Thank you for choosing sustainable products
                </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-white rounded-2xl card-shadow p-5 mb-3 animate-slide-up">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[11px] text-gray-400 uppercase font-semibold tracking-wider">Order Number</p>
                        <p className="text-base font-extrabold text-gray-900 mt-0.5 font-mono">#{orderNumber}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[11px] text-gray-400 uppercase font-semibold tracking-wider">Amount Paid</p>
                        <p className="text-base font-extrabold bg-gradient-to-r from-eco-green to-emerald-600 bg-clip-text text-transparent mt-0.5">
                            ₹{grandTotal.toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[11px] text-gray-400 uppercase font-semibold tracking-wider">Estimated Delivery</p>
                        <p className="text-sm font-semibold text-gray-800 mt-0.5">{formatted}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[11px] text-gray-400 uppercase font-semibold tracking-wider">Items</p>
                        <p className="text-sm font-semibold text-gray-800 mt-0.5">{cartItems.length} product{cartItems.length !== 1 ? "s" : ""}</p>
                    </div>
                </div>
            </div>

            {/* Delivery Address */}
            {shippingAddress && (
                <div className="bg-white rounded-2xl card-shadow p-5 mb-3 animate-slide-up" style={{ animationDelay: "80ms" }}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm">📍</span>
                        <h2 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Delivering To</h2>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3.5">
                        <p className="font-bold text-gray-900 text-sm">{shippingAddress.fullName}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{shippingAddress.addressLine1}</p>
                        {shippingAddress.addressLine2 && <p className="text-sm text-gray-600">{shippingAddress.addressLine2}</p>}
                        <p className="text-sm text-gray-600">{shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pinCode}</p>
                    </div>
                </div>
            )}

            {/* Eco Impact */}
            <div className="bg-gradient-to-r from-eco-green to-emerald-600 rounded-2xl p-5 text-white mb-5 animate-slide-up" style={{ animationDelay: "160ms" }}>
                <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🌳</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Your Eco Impact</h3>
                        <p className="text-white/80 text-xs mt-1 leading-relaxed">
                            This order saves ~200g of plastic waste and plants 1 tree in partnership with our reforestation program.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                    {[
                        { value: "200g", label: "Plastic Saved" },
                        { value: "1", label: "Tree Planted" },
                        { value: "🌍", label: "Carbon Neutral" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5 text-center">
                            <p className="text-lg font-extrabold">{stat.value}</p>
                            <p className="text-[10px] text-white/70 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md pt-4 pb-6 px-4 border-t border-gray-100 z-10">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={() => {
                            const storedState = localStorage.getItem("ecoyaan_checkout_state");
                            let addressesToKeep = [];
                            if (storedState) {
                                try {
                                    const parsed = JSON.parse(storedState);
                                    if (parsed.savedAddresses) {
                                        addressesToKeep = parsed.savedAddresses;
                                    }
                                } catch (e) {
                                    // ignore
                                }
                            }

                            const newState = {
                                savedAddresses: addressesToKeep,
                                currentStep: "cart",
                            };

                            localStorage.setItem("ecoyaan_checkout_state", JSON.stringify(newState));
                            window.location.reload();
                        }}
                        className="w-full bg-white text-gray-700 font-bold py-4 rounded-2xl card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-300 text-sm flex items-center justify-center gap-2"
                    >
                        <span className="text-lg">🛒</span>
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}
