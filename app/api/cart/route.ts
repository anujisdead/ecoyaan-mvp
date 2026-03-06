import { NextResponse } from "next/server";

const cartData = {
  cartItems: [
    {
      product_id: 101,
      product_name: "Bamboo Toothbrush (Pack of 4)",
      product_price: 299,
      quantity: 2,
      image: "https://via.placeholder.com/150/4caf50/ffffff?text=🪥",
    },
    {
      product_id: 102,
      product_name: "Reusable Cotton Produce Bags",
      product_price: 450,
      quantity: 1,
      image: "https://via.placeholder.com/150/81c784/ffffff?text=🛍️",
    },
  ],
  shipping_fee: 50,
  discount_applied: 0,
};

export async function GET() {
  // Simulate a slight API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return NextResponse.json(cartData);
}
