"use client";

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from "react";
import { CartItem, CartData, ShippingAddress, CheckoutStep } from "@/lib/types";

interface CheckoutContextType {
    cartData: CartData | null;
    setCartData: (data: CartData) => void;
    cartItems: CartItem[];
    removeCartItem: (productId: number) => void;
    updateItemQuantity: (productId: number, quantity: number) => void;
    shippingAddress: ShippingAddress | null;
    setShippingAddress: (address: ShippingAddress) => void;
    currentStep: CheckoutStep;
    setCurrentStep: (step: CheckoutStep) => void;
    subtotal: number;
    shippingFee: number;
    grandTotal: number;
    orderNumber: string;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
    undefined
);

function generateOrderNumber() {
    return "ECO" + Math.floor(100000 + Math.random() * 900000).toString();
}

export function CheckoutProvider({ children }: { children: ReactNode }) {
    const [cartData, setCartData] = useState<CartData | null>(null);
    const [shippingAddress, setShippingAddress] =
        useState<ShippingAddress | null>(null);
    const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
    const [orderNumber] = useState<string>(generateOrderNumber());

    const cartItems = cartData?.cartItems ?? [];
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.product_price * item.quantity,
        0
    );
    const shippingFee = cartData?.shipping_fee ?? 0;
    const grandTotal = subtotal + shippingFee - (cartData?.discount_applied ?? 0);

    const handleSetCartData = useCallback((data: CartData) => {
        setCartData(data);
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

    return (
        <CheckoutContext.Provider
            value={{
                cartData,
                setCartData: handleSetCartData,
                cartItems,
                removeCartItem,
                updateItemQuantity,
                shippingAddress,
                setShippingAddress,
                currentStep,
                setCurrentStep,
                subtotal,
                shippingFee,
                grandTotal,
                orderNumber,
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
