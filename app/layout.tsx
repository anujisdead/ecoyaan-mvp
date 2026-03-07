import type { Metadata } from "next";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "Ecoyaan Checkout — Sustainable Shopping",
  description:
    "Complete your eco-friendly purchase on Ecoyaan. Secure checkout with fast delivery across India.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen relative">
        <AnimatedBackground />
        <CheckoutProvider>
          {/* Sticky Header */}
          <header className="sticky top-0 z-50 glass border-b border-black/[0.04]">
            <div className="max-w-2xl mx-auto px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[12px] bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20 transition-transform duration-300 hover:scale-105">
                  <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                </div>
                <div className="leading-none">
                  <span className="text-[17px] font-extrabold tracking-[-0.02em] text-slate-800">
                    Eco<span className="text-gradient">yaan</span>
                  </span>
                  <p className="text-[9px] text-slate-400 font-bold tracking-[0.12em] uppercase mt-[1px]">
                    Sustainability made easy
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-50/80 px-3 py-1.5 rounded-full border border-slate-100">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Secure</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="pb-12">{children}</main>

          {/* Footer */}
          <footer className="pb-10">
            <div className="max-w-2xl mx-auto px-5">
              <div className="border-t border-slate-100 pt-6 text-center">
                <p className="text-[11px] text-slate-300 font-medium">
                  Sustainable products for a greener tomorrow 🌿
                </p>
                <p className="text-[10px] text-slate-200 mt-1">
                  © 2025 Ecoyaan · All rights reserved
                </p>
              </div>
            </div>
          </footer>
        </CheckoutProvider>
      </body>
    </html>
  );
}
