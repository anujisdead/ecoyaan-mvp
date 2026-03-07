"use client";

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
    useEffect,
} from "react";
import { CartItem, CartData, ShippingAddress, CheckoutStep } from "@/lib/types";

interface CheckoutContextType {
    cartData: CartData | null;
    setCartData: (data: CartData) => void;
    cartItems: CartItem[];
    removeCartItem: (productId: number) => void;
    updateItemQuantity: (productId: number, quantity: number) => void;

    savedAddresses: ShippingAddress[];
    addSavedAddress: (address: ShippingAddress) => void;
    removeSavedAddress: (id: string) => void;
    shippingAddress: ShippingAddress | null;
    setShippingAddress: (address: ShippingAddress) => void;

    currentStep: CheckoutStep;
    setCurrentStep: (step: CheckoutStep) => void;

    subtotal: number;
    shippingFee: number;
    grandTotal: number;
    orderNumber: string;
    isLoaded: boolean;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
    undefined
);

function generateOrderNumber() {
    return "ECO" + Math.floor(100000 + Math.random() * 900000).toString();
}



export function CheckoutProvider({ children }: { children: ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cartData, setCartData] = useState<CartData | null>(null);
    const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>([]);
    const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
    const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
    const [orderNumber, setOrderNumber] = useState<string>("");

    // Initialize from localStorage on mount
    useEffect(() => {
        setIsMounted(true);
        const storedState = localStorage.getItem("ecoyaan_checkout_state");
        if (storedState) {
            try {
                const parsed = JSON.parse(storedState);
                if (parsed.cartData) setCartData(parsed.cartData);
                if (parsed.savedAddresses !== undefined) {
                    setSavedAddresses(parsed.savedAddresses);
                }
                if (parsed.shippingAddress) setShippingAddress(parsed.shippingAddress);
                if (parsed.currentStep) setCurrentStep(parsed.currentStep);
                if (parsed.orderNumber) {
                    setOrderNumber(parsed.orderNumber);
                } else {
                    setOrderNumber(generateOrderNumber());
                }
            } catch (e) {
                console.error("Failed to parse checkout state", e);
                setOrderNumber(generateOrderNumber());
            }
        } else {
            setOrderNumber(generateOrderNumber());
        }
        setIsLoaded(true);
    }, []);

    // Persist to localStorage whenever crucial state changes
    useEffect(() => {
        if (!isMounted) return;
        const stateToSave = {
            cartData,
            savedAddresses,
            shippingAddress,
            currentStep,
            orderNumber,
        };
        localStorage.setItem("ecoyaan_checkout_state", JSON.stringify(stateToSave));
    }, [isMounted, cartData, savedAddresses, shippingAddress, currentStep, orderNumber]);

    const cartItems = cartData?.cartItems ?? [];
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.product_price * item.quantity,
        0
    );
    const shippingFee = cartData?.shipping_fee ?? 0;
    const grandTotal = subtotal + shippingFee - (cartData?.discount_applied ?? 0);

    const handleSetCartData = useCallback((data: CartData) => {
        setCartData((prev) => {
            // Only update cart data if we didn't already load it from localStorage
            // or if the length changed significantly
            if (prev && prev.cartItems.length > 0) return prev;
            return data;
        });
    }, []);

    const removeCartItem = useCallback((productId: number) => {
        setCartData((prev) => {
            if (!prev) return prev;
            const updated = prev.cartItems.filter(
                (item) => item.product_id !== productId
            );
            return { ...prev, cartItems: updated };
        });
    }, []);

    const updateItemQuantity = useCallback(
        (productId: number, quantity: number) => {
            setCartData((prev) => {
                if (!prev) return prev;
                if (quantity <= 0) {
                    return {
                        ...prev,
                        cartItems: prev.cartItems.filter(
                            (item) => item.product_id !== productId
                        ),
                    };
                }
                return {
                    ...prev,
                    cartItems: prev.cartItems.map((item) =>
                        item.product_id === productId ? { ...item, quantity } : item
                    ),
                };
            });
        },
        []
    );

    const addSavedAddress = useCallback((address: ShippingAddress) => {
        setSavedAddresses((prev) => {
            const exists = prev.find((a) => a.id === address.id);
            if (exists) {
                return prev.map((a) => (a.id === address.id ? address : a));
            }
            return [...prev, address];
        });
    }, []);

    const removeSavedAddress = useCallback((id: string) => {
        setSavedAddresses((prev) => prev.filter((a) => a.id !== id));
    }, []);

    return (
        <CheckoutContext.Provider
            value={{
                cartData,
                setCartData: handleSetCartData,
                cartItems,
                removeCartItem,
                updateItemQuantity,
                savedAddresses,
                addSavedAddress,
                removeSavedAddress,
                shippingAddress,
                setShippingAddress,
                currentStep,
                setCurrentStep,
                subtotal,
                shippingFee,
                grandTotal,
                orderNumber,
                isLoaded,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckout() {
    const ctx = useContext(CheckoutContext);
    if (!ctx)
        throw new Error("useCheckout must be used within CheckoutProvider");
    return ctx;
}
