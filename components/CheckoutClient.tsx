"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCheckout } from "@/context/CheckoutContext";
import { CartData } from "@/lib/types";
import CartScreen from "@/components/CartScreen";
import ShippingScreen from "@/components/ShippingScreen";
import PaymentScreen from "@/components/PaymentScreen";
import SuccessScreen from "@/components/SuccessScreen";

interface CheckoutClientProps {
    initialCartData: CartData;
}

const STEP_ORDER = ["cart", "shipping", "payment", "success"] as const;

const pageVariants = {
    initial: (direction: number) => ({
        x: direction > 0 ? 60 : -60,
        opacity: 0,
        scale: 0.98,
        filter: "blur(4px)",
    }),
    animate: {
        x: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -40 : 40,
        opacity: 0,
        scale: 0.98,
        filter: "blur(4px)",
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
        },
    }),
};

export default function CheckoutClient({ initialCartData }: CheckoutClientProps) {
    const { setCartData, currentStep } = useCheckout();
    const [direction, setDirection] = useState(0);
    const prevStep = useRef(currentStep);

    useEffect(() => {
        setCartData(initialCartData);
    }, [initialCartData, setCartData]);

    useEffect(() => {
        const prevIndex = STEP_ORDER.indexOf(prevStep.current);
        const nextIndex = STEP_ORDER.indexOf(currentStep);
        setDirection(nextIndex > prevIndex ? 1 : -1);
        prevStep.current = currentStep;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

    const screens: Record<string, React.ReactNode> = {
        cart: <CartScreen />,
        shipping: <ShippingScreen />,
        payment: <PaymentScreen />,
        success: <SuccessScreen />,
    };

    return (
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={currentStep}
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="will-change-transform"
            >
                {screens[currentStep]}
            </motion.div>
        </AnimatePresence>
    );
}
