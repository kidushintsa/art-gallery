"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
  User,
  ArrowRight,
} from "lucide-react";

export default function VerifyPaymentPage() {
  const { txRef } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!txRef) return;

    const verify = async () => {
      try {
        const res = await fetch("/api/payment/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tx_ref: txRef }),
        });
        await res.json();

        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Error verifying payment", err);
        setStatus("error");
      }
    };

    verify();
  }, [txRef]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Verifying Payment
            </h2>
            <p className="text-gray-600 mb-6">
              Please wait while we confirm your payment details. This may take a
              few moments.
            </p>

            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full animate-pulse"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                Processing transaction #{txRef}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute w-6 h-6 bg-yellow-400 rounded-full -mt-2 ml-16 animate-bounce">
                <span className="text-yellow-800 text-xs">✨</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
              Payment Verified!
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Thank you for your purchase! Your payment has been successfully
              processed and your order is confirmed.
            </p>

            <Button
              onClick={() => router.push("/dashboard/user")}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <User className="w-5 h-5 mr-2" />
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <XCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-3">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              We couldn&apos;t verify your payment at this time. If you were
              charged, please contact our support team.
            </p>

            <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-red-800 font-medium text-sm">
                    Transaction Reference:
                  </p>
                  <p className="text-red-700 font-mono text-sm">{txRef}</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => router.push("/dashboard/user")}
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <User className="w-5 h-5 mr-2" />
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
