"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function AnimatedBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    // Transform mouse coordinates (-1 to 1) to gentle parallax movements
    const parallaxX1 = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
    const parallaxY1 = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

    const parallaxX2 = useTransform(smoothMouseX, [-1, 1], [20, -20]);
    const parallaxY2 = useTransform(smoothMouseY, [-1, 1], [20, -20]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position between -1 and 1
            const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
            const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;

            mouseX.set(normalizedX);
            mouseY.set(normalizedY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 w-full h-full bg-[#f8fafc] -z-10 overflow-hidden pointer-events-none">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>

            {/* Top Right Blob */}
            <motion.div
                style={{ x: parallaxX1, y: parallaxY1 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-green-400/40 blur-[80px]"
            />

            {/* Bottom Left Blob */}
            <motion.div
                style={{ x: parallaxX2, y: parallaxY2 }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-40 -left-64 w-[800px] h-[800px] rounded-full bg-emerald-300/40 blur-[100px]"
            />

            {/* Center Blob */}
            <motion.div
                animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute top-[20%] left-[20%] w-[800px] h-[600px] rounded-full bg-eco-green/20 blur-[120px]"
            />
        </div>
    );
}
