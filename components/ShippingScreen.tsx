"use client";

import { useState } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { ShippingAddress } from "@/lib/types";
import StepIndicator from "@/components/StepIndicator";

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu",
    "Delhi", "Jammu & Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const SAVED_ADDRESSES: ShippingAddress[] = [
    {
        fullName: "Anuj Nimmala",
        email: "anuj@ecoyaan.com",
        phone: "9876543210",
        addressLine1: "Block A, West Avenue",
        addressLine2: "45th Street, Koramangala",
        city: "Bengaluru",
        state: "Karnataka",
        pinCode: "560001",
    },
    {
        fullName: "Anuj Nimmala",
        email: "anuj@ecoyaan.com",
        phone: "9876543210",
        addressLine1: "Flat 302, Lotus Towers",
        addressLine2: "Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        pinCode: "400001",
    },
];

type FormFields = keyof ShippingAddress;

interface FieldErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pinCode?: string;
}

const initialForm: ShippingAddress = {
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
};

function validate(form: ShippingAddress): FieldErrors {
    const errors: FieldErrors = {};
    if (!form.fullName.trim()) errors.fullName = "Full name is required";
    if (!form.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = "Enter a valid email";
    }
    if (!form.phone.trim()) {
        errors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
        errors.phone = "Enter 10-digit number";
    }
    if (!form.addressLine1.trim()) errors.addressLine1 = "Address is required";
    if (!form.city.trim()) errors.city = "City is required";
    if (!form.state) errors.state = "Select a state";
    if (!form.pinCode.trim()) {
        errors.pinCode = "PIN code is required";
    } else if (!/^\d{6}$/.test(form.pinCode)) {
        errors.pinCode = "Enter 6-digit PIN";
    }
    return errors;
}

interface InputFieldProps {
    label: string;
    id: FormFields;
    type?: string;
    placeholder: string;
    value: string;
    error?: string;
    required?: boolean;
    onChange: (field: FormFields, value: string) => void;
    maxLength?: number;
}

function InputField({ label, id, type = "text", placeholder, value, error, required = true, onChange, maxLength }: InputFieldProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                onChange={(e) => onChange(id, e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium bg-gray-50 text-gray-900 placeholder:text-gray-300 transition-all duration-200 outline-none ${error
                        ? "border-red-300 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:border-eco-green focus:bg-white focus:ring-2 focus:ring-eco-green/10 hover:border-gray-300"
                    }`}
            />
            {error && (
                <p className="text-red-500 text-[11px] mt-1 font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    {error}
                </p>
            )}
        </div>
    );
}

export default function ShippingScreen() {
    const { setShippingAddress, setCurrentStep } = useCheckout();
    const [form, setForm] = useState<ShippingAddress>(initialForm);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [touched, setTouched] = useState<Partial<Record<FormFields, boolean>>>({});
    const [selectedSavedIndex, setSelectedSavedIndex] = useState<number | null>(null);
    const [useNewAddress, setUseNewAddress] = useState(false);

    const handleChange = (field: FormFields, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (touched[field]) {
            const newErrors = validate({ ...form, [field]: value });
            setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
        }
    };

    const handleBlur = (field: FormFields) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        const newErrors = validate(form);
        setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    };

    const handleSelectSavedAddress = (index: number) => {
        setSelectedSavedIndex(index);
        setUseNewAddress(false);
        setForm(SAVED_ADDRESSES[index]);
        setErrors({});
    };

    const handleUseNewAddress = () => {
        setSelectedSavedIndex(null);
        setUseNewAddress(true);
        setForm(initialForm);
        setErrors({});
        setTouched({});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const allTouched = Object.keys(initialForm).reduce(
            (acc, k) => ({ ...acc, [k]: true }),
            {}
        ) as Record<FormFields, boolean>;
        setTouched(allTouched);
        const newErrors = validate(form);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setShippingAddress(form);
            setCurrentStep("payment");
        }
    };

    const showForm = useNewAddress || selectedSavedIndex !== null;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <StepIndicator currentStep="shipping" />

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-eco-green/10 to-emerald-100 flex items-center justify-center">
                    <span className="text-xl">📍</span>
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Shipping Address</h1>
                    <p className="text-sm text-gray-400 font-medium">Where should we deliver?</p>
                </div>
            </div>

            {/* Saved Addresses */}
            {SAVED_ADDRESSES.length > 0 && (
                <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm">🏠</span>
                        <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Saved Addresses</h2>
                    </div>
                    <div className="space-y-2">
                        {SAVED_ADDRESSES.map((addr, index) => (
                            <label
                                key={index}
                                className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selectedSavedIndex === index
                                        ? "border-eco-green bg-eco-green/5 shadow-sm shadow-eco-green/10"
                                        : "border-gray-100 bg-white hover:border-eco-green/30 hover:bg-gray-50 card-shadow"
                                    }`}
                                onClick={() => handleSelectSavedAddress(index)}
                            >
                                <input
                                    type="radio"
                                    name="savedAddress"
                                    checked={selectedSavedIndex === index}
                                    onChange={() => handleSelectSavedAddress(index)}
                                    className="accent-eco-green mt-1 w-4 h-4"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <p className="font-bold text-sm text-gray-900">{addr.fullName}</p>
                                        {index === 0 && (
                                            <span className="text-[10px] bg-eco-green/10 text-eco-green font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                Default
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ""}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {addr.city}, {addr.state} — {addr.pinCode}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">{addr.phone} · {addr.email}</p>
                                </div>
                            </label>
                        ))}
                    </div>

                    <button
                        onClick={handleUseNewAddress}
                        className={`mt-2 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed text-sm font-bold transition-all duration-200 ${useNewAddress
                                ? "border-eco-green text-eco-green bg-eco-green/5"
                                : "border-gray-200 text-gray-400 hover:border-eco-green hover:text-eco-green"
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Address
                    </button>
                </div>
            )}

            {/* Address Form */}
            <form onSubmit={handleSubmit} noValidate>
                {(showForm || SAVED_ADDRESSES.length === 0) && (
                    <div className={`bg-white rounded-2xl card-shadow p-6 space-y-4 mb-5 transition-all duration-300 animate-slide-up ${useNewAddress ? "ring-2 ring-eco-green/20" : ""
                        }`}>
                        {useNewAddress && (
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-eco-green" />
                                <p className="text-xs text-eco-green font-bold uppercase tracking-wider">New Address</p>
                            </div>
                        )}

                        <InputField label="Full Name" id="fullName" placeholder="John Doe" value={form.fullName} error={errors.fullName} onChange={handleChange} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Email" id="email" type="email" placeholder="john@example.com" value={form.email} error={errors.email} onChange={handleChange} />
                            <InputField label="Phone" id="phone" type="tel" placeholder="9876543210" value={form.phone} error={errors.phone} onChange={handleChange} maxLength={10} />
                        </div>

                        <InputField label="Address Line 1" id="addressLine1" placeholder="House/Flat No., Building, Street" value={form.addressLine1} error={errors.addressLine1} onChange={handleChange} />
                        <InputField label="Address Line 2" id="addressLine2" placeholder="Area, Landmark (optional)" value={form.addressLine2} error={errors.addressLine2} required={false} onChange={handleChange} />

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <InputField label="City" id="city" placeholder="Bengaluru" value={form.city} error={errors.city} onChange={handleChange} />
                            <div>
                                <label htmlFor="state" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                    State <span className="text-red-400">*</span>
                                </label>
                                <select
                                    id="state"
                                    value={form.state}
                                    onChange={(e) => handleChange("state", e.target.value)}
                                    onBlur={() => handleBlur("state")}
                                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium bg-gray-50 text-gray-900 transition-all duration-200 outline-none ${errors.state
                                            ? "border-red-300 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                                            : "border-gray-200 focus:border-eco-green focus:bg-white focus:ring-2 focus:ring-eco-green/10 hover:border-gray-300"
                                        }`}
                                >
                                    <option value="">Select</option>
                                    {INDIAN_STATES.map((s) => (<option key={s} value={s}>{s}</option>))}
                                </select>
                                {errors.state && <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.state}</p>}
                            </div>
                            <InputField label="PIN Code" id="pinCode" placeholder="560001" value={form.pinCode} error={errors.pinCode} onChange={handleChange} maxLength={6} />
                        </div>
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setCurrentStep("cart")}
                        className="flex-1 bg-white border-2 border-gray-200 text-gray-500 font-bold py-4 rounded-2xl hover:border-eco-green hover:text-eco-green transition-all duration-200 text-sm card-shadow"
                    >
                        ← Back
                    </button>
                    <button
                        type="submit"
                        disabled={!showForm && SAVED_ADDRESSES.length > 0}
                        className="flex-[2] bg-gradient-to-r from-eco-green to-emerald-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-base flex items-center justify-center gap-2 btn-glow disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
                    >
                        Continue to Payment
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}
