"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import CartCard from "@/custom-components/user/cartCard";
import PaymentCard from "@/custom-components/user/paymentCard";
import { useRouter } from "next/navigation";

interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  approved: boolean;
  createdAt: Date;
  user?: {
    name?: string; // optional, if artist name included
  };
}

interface CartItem {
  id: string;
  addedAt: Date;
  userId: string;
  artworkId: string;
  artwork: Artwork;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch("/api/cart-items");
        const json = await res.json();
        setCartItems(json.cartItems); // ✅ extract array
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (id: string, artworkId: string) => {
    try {
      await axios.post("/api/cart/remove", { artworkId });
      setCartItems((items) => items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.artwork.price, 0);
  const shipping = 250;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => router.push("/dashboard/user")}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-600">
              You have {cartItems.length} item
              {cartItems.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartCard
                key={item.id}
                id={item.id}
                imageUrl={item.artwork.imageUrl}
                title={item.artwork.title}
                artist={item.artwork.user?.name || "Unknown Artist"}
                price={item.artwork.price}
                onRemove={() => handleRemoveItem(item.id, item.artworkId)}
              />
            ))}

            {cartItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            )}
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1">
            <PaymentCard
              subtotal={subtotal}
              shipping={shipping}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
