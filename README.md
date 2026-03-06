# 🌿 Ecoyaan Checkout Flow

A beautiful, animated checkout experience built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-purple?logo=framer)

---

## Quick Start

```bash
git clone <your-repo-url>
cd ecoyaan-mvp
npm install
npm run dev
```

Open **http://localhost:3001** in your browser.

---

## Checkout Flow

```
🛒 Cart  →  📍 Shipping  →  💳 Payment  →  ✅ Success
```

| Step | What it does |
|------|-------------|
| **Cart** | View products, adjust quantities, remove items |
| **Shipping** | Pick a saved address or enter a new one |
| **Payment** | Choose UPI / Card / COD, review order |
| **Success** | Order confirmation with eco-impact stats |

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 (App Router) | SSR + Server Components |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling + design tokens |
| Framer Motion | Page transitions + animations |
| React Context API | Cart & checkout state |

---

## Project Structure

```
ecoyaan-mvp/
├── app/
│   ├── layout.tsx          # Root layout with header & footer
│   ├── page.tsx            # SSR entry — fetches cart data server-side
│   └── globals.css         # Design system (tokens, cards, buttons, inputs)
├── components/
│   ├── CheckoutClient.tsx  # Framer Motion page transitions
│   ├── StepIndicator.tsx   # Animated step progress bar
│   ├── CartScreen.tsx      # Cart view with item cards
│   ├── CartItemCard.tsx    # Product card (image, qty, remove)
│   ├── ShippingScreen.tsx  # Address form + saved addresses
│   ├── PaymentScreen.tsx   # Payment method selection
│   └── SuccessScreen.tsx   # Order confirmation + eco impact
├── context/
│   └── CheckoutContext.tsx # Global state (cart, address, step)
├── lib/
│   └── types.ts            # TypeScript interfaces
└── public/
    └── products/           # Product images
```

---

## Key Features

- **Smooth page transitions** — directional slide + blur between steps
- **Server-side rendering** — cart data fetched on the server (no loading flicker)
- **Real product images** — AI-generated eco-product photography
- **Animated interactions** — quantity pop, swipe-to-delete, breathing step indicator
- **Form validation** — inline errors with animated reveal
- **Saved addresses** — pick from list or add new
- **Eco impact card** — plastic saved, trees planted stats on success

---

## How It Works

**SSR → Client Hydration:**
`page.tsx` (Server Component) fetches mock cart data, passes it to `CheckoutClient.tsx` (Client Component), which hydrates the React Context.

**State Management:**
`CheckoutContext` holds cart items, shipping address, current step, and computed totals. All steps share the same state — no page reloads.

**Transitions:**
`CheckoutClient` wraps screens in Framer Motion's `AnimatePresence`. Moving forward slides right, going back slides left, with blur and scale effects.

---

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server on port 3001 |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
