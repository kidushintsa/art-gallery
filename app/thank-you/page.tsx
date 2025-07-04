"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Package,
  Clock,
  ArrowRight,
  Home,
  User,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function ThankYouPage() {
  const router = useRouter();

  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    // Generate order number client-side to avoid hydration mismatch
    const generated = Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderNumber(generated);

    // Confetti effect
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"],
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl mx-auto">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-yellow-800" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for your purchase! Your order has been confirmed and
            we&apos;re preparing your beautiful artwork for delivery.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Order Confirmation
              </h2>
              <div className="text-right">
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="text-lg font-mono font-bold text-indigo-600">
                  {orderNumber ? `#${orderNumber}` : "Loading..."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-600">
                    Payment Confirmed
                  </p>
                  <p className="text-sm text-gray-500">Just now</p>
                </div>
              </div>

              <div className="flex-1 h-px bg-gray-200 mx-4"></div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-600">Processing</p>
                  <p className="text-sm text-gray-500">1-2 business days</p>
                </div>
              </div>

              <div className="flex-1 h-px bg-gray-200 mx-4"></div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Delivery</p>
                  <p className="text-sm text-gray-500">3-5 business days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="mb-8 shadow-xl border-0 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              What happens next?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Order Confirmation Email",
                    desc: "You'll receive a detailed confirmation email shortly.",
                    color: "green",
                  },
                  {
                    step: "2",
                    title: "Artwork Preparation",
                    desc: "Our team will carefully package your artwork for shipping.",
                    color: "blue",
                  },
                ].map((item) => (
                  <div className="flex items-start gap-4" key={item.step}>
                    <div
                      className={`w-6 h-6 bg-${item.color}-100 rounded-full flex items-center justify-center mt-1`}
                    >
                      <span
                        className={`text-${item.color}-600 font-bold text-sm`}
                      >
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: "3",
                    title: "Shipping Updates",
                    desc: "Get real-time notifications once your artwork is on the way.",
                    color: "purple",
                  },
                  {
                    step: "4",
                    title: "Enjoy Your Art",
                    desc: "Receive and enjoy your artwork!",
                    color: "orange",
                  },
                ].map((item) => (
                  <div className="flex items-start gap-4" key={item.step}>
                    <div
                      className={`w-6 h-6 bg-${item.color}-100 rounded-full flex items-center justify-center mt-1`}
                    >
                      <span
                        className={`text-${item.color}-600 font-bold text-sm`}
                      >
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push("/dashboard/user")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            <User className="w-5 h-5 mr-2" />
            Go to Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-2 border-gray-300 hover:border-gray-400 px-8 py-3 text-lg font-semibold bg-white hover:bg-gray-50 transition-all duration-200"
            size="lg"
          >
            <Link href="/user/cart">
              <Home className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        {/* Support */}
        <div className="mt-12 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
            <p className="text-gray-600 mb-4">
              Our customer support team is here to assist you with any
              questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="ghost"
                className="text-indigo-600 hover:text-indigo-700"
              >
                Contact Support
              </Button>
              <Button
                variant="ghost"
                className="text-indigo-600 hover:text-indigo-700"
              >
                Track Your Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
