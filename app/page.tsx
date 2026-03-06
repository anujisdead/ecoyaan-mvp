import type { CartData } from "@/lib/types";
import CheckoutClient from "@/components/CheckoutClient";

const mockCartData: CartData = {
  cartItems: [
    {
      product_id: 101,
      product_name: "Bamboo Toothbrush (Pack of 4)",
      product_price: 299,
      quantity: 2,
      image: "/products/bamboo-toothbrush.png",
    },
    {
      product_id: 102,
      product_name: "Reusable Cotton Produce Bags",
      product_price: 450,
      quantity: 1,
      image: "/products/cotton-produce-bags.png",
    },
  ],
  shipping_fee: 50,
  discount_applied: 0,
};

async function getCartData(): Promise<CartData> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return mockCartData;
}

export default async function CheckoutPage() {
  const cartData = await getCartData();
  return <CheckoutClient initialCartData={cartData} />;
}
