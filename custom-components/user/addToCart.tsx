"use client";

import { Plus, ShoppingCart, Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import axios from "axios";
import { useState } from "react";
// import { useCart } from "@/app/context/cart-context";

interface AddToCartButtonProps {
  id: string;
}
export function AddToCartButton({ id }: AddToCartButtonProps) {
  const { isInCart, mutate } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    await axios.post("/api/cart/add", { artworkId: id });
    mutate(); // Refresh cart
    setLoading(false);
  };

  // const handleRemove = async () => {
  //   await axios.post("/api/cart/remove", { artworkId: id });
  //   mutate(); // Refresh cart
  // };

  const added = isInCart(id);
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2 rounded-full flex items-center gap-1"
      onClick={!added ? handleAdd : undefined}
    >
      <ShoppingCart className="h-4 w-4" />
      {loading && <Loader className="h-3 w-3" />}
      {added && !loading ? (
        <Check className="h-3 w-3" />
      ) : (
        <Plus className="h-3 w-3" />
      )}
    </Button>
  );
}
