import { User } from "lucide-react";

interface PaymentCardProps {
  subtotal: number;
  shipping: number;
  total: number;
}

export default function PaymentCard({
  subtotal,
  shipping,
  total,
}: PaymentCardProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Card Details</h3>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm opacity-80 mb-2">Card type</p>
        <div className="flex gap-2">
          <div className="w-8 h-6 bg-red-500 rounded flex items-center justify-center text-xs font-bold">
            MC
          </div>
          <div className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">
            V
          </div>
          <div className="w-8 h-6 bg-green-500 rounded flex items-center justify-center text-xs font-bold">
            CB
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm opacity-80">Name on card</label>
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 mt-1 placeholder-white/60"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm opacity-80">Card Number</label>
            <input
              type="text"
              placeholder="1111 2222 3333 4444"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 mt-1 placeholder-white/60"
            />
          </div>
          <div>
            <label className="text-sm opacity-80">Expiration date</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 mt-1 placeholder-white/60"
            />
          </div>
        </div>

        <div>
          <label className="text-sm opacity-80">CVV</label>
          <input
            type="text"
            placeholder="123"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 mt-1 placeholder-white/60"
          />
        </div>
      </div>

      <div className="space-y-2 mb-6 text-sm">
        <div className="flex justify-between">
          <span className="opacity-80">Subtotal</span>
          <span>{subtotal.toLocaleString()} ETB</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-80">Shipping</span>
          <span>{shipping.toLocaleString()} ETB</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-80">Total (Tax incl.)</span>
          <span>{total.toLocaleString()} ETB</span>
        </div>
      </div>

      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors">
        Checkout
      </button>
    </div>
  );
}
