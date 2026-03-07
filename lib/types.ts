export interface CartItem {
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
}

export interface CartData {
    cartItems: CartItem[];
    shipping_fee: number;
    discount_applied: number;
}

export interface ShippingAddress {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pinCode: string;
}

export type CheckoutStep = "cart" | "shipping" | "payment" | "success";
