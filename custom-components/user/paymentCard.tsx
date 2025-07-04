"use client";
import { ShoppingCart, CreditCard } from "lucide-react";

interface PaymentCardProps {
  subtotal: number;
  shipping: number;
  total: number;
  cartLength: number;
}

export default function PaymentCard({
  subtotal,
  shipping,
  total,
  cartLength,
}: PaymentCardProps) {
  const empty = cartLength === 0 ? true : false;
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold">Order Summary</h3>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <ShoppingCart className="w-6 h-6" />
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-6 mb-8">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80 font-medium">Subtotal</span>
              <span className="font-bold text-lg">
                {subtotal.toLocaleString()} ETB
              </span>
            </div>
            <div className="h-px bg-white/20"></div>
            <div className="flex justify-between items-center">
              <span className="text-white/80 font-medium">Shipping</span>
              <span className="font-bold text-lg">
                {shipping.toLocaleString()} ETB
              </span>
            </div>
          </div>
        </div>

        {/* Total Section */}
        <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm border border-white/20">
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold text-lg">
              Total (Tax incl.)
            </span>
            <span className="font-bold text-2xl">
              {total.toLocaleString()} ETB
            </span>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mb-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <CreditCard className="w-5 h-5 text-white/80" />
          <span className="text-white/80 font-medium">Secure Payment</span>
        </div>
        <p className="text-white/70 text-sm">
          Your payment information will be processed securely. We accept all
          major payment methods.
        </p>
      </div>

      {/* Checkout Button */}
      <button
        className={
          !empty
            ? "w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
            : "bg-emerald-700  text-white font-bold py-4 rounded-xl w-full cursor-not-allowed"
        }
        disabled={empty}
        onClick={() => {
          console.log("clicked");
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <CreditCard className="w-5 h-5" />
          <span className="text-lg">
            {empty ? "empty cart😢" : "Proceed to Checkout"}
          </span>
        </div>
      </button>

      {/* Security Badge */}
      <div className="mt-4 text-center">
        <p className="text-white/60 text-xs">🔒 Secured</p>
      </div>
    </div>
  );
}
