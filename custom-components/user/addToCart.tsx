"use client";

import { Plus, Minus, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { useCart } from "@/app/context/cart-context";

interface AddToCartButtonProps {
  id: number;
}
// eslint-disable-next-line react-hooks/rules-of-hooks
export function AddToCartButton({ id }: AddToCartButtonProps) {
  const [inCart, setIncart] = useState(false);

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2 rounded-full flex items-center gap-1"
      onClick={() => {
        if (!inCart) {
          setIncart(true);
          console.log(`button clicked with ID: ${id}: ${inCart}`);
        }
        return;
      }}
    >
      <ShoppingCart className="h-4 w-4" />
      {inCart ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
    </Button>
  );
}
