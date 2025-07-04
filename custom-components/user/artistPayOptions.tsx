"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Palette, CreditCard, Banknote, Shield, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const paymentMethods = [
  "Commercial Bank of Ethiopia (CBE)",
  "Awash Bank",
  "Dashen Bank",
  "Bank of Abyssinia",
  "Wegagen Bank",
  "Nib International Bank",
  "Cooperative Bank of Oromia (CBO)",
  "Oromia International Bank (OIB)",
  "Hibret Bank",
  "Zemen Bank",
  "telebirr",
];

const formSchema = z
  .object({
    paymentMethod: z.string().min(1, "Please select a payment method"),
    accountNumber: z.string().min(1, "Account number is required"),
    accountHolderName: z
      .string()
      .min(2, "Account holder name must be at least 2 characters"),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "telebirr") {
        return (
          data.accountNumber.length === 10 && /^\d+$/.test(data.accountNumber)
        );
      } else {
        return (
          data.accountNumber.length === 13 && /^\d+$/.test(data.accountNumber)
        );
      }
    },
    {
      message:
        "Account number must be 10 digits for telebirr or 13 digits for banks",
      path: ["accountNumber"],
    }
  );

export default function ArtistPayOptions() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "",
      accountNumber: "",
      accountHolderName: "",
    },
  });

  const selectedPaymentMethod = form.watch("paymentMethod");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/artist/payout/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Something went wrong");

      alert("Payment info saved successfully!");
      router.push("/dashboard/artist");
    } catch (error) {
      console.error("Error submitting payout setup:", error);
      alert("Failed to save payment info. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAccountNumberPlaceholder = () => {
    if (selectedPaymentMethod === "telebirr") {
      return "Enter 10-digit telebirr number";
    }
    return "Enter 13-digit account number";
  };

  const getAccountNumberMaxLength = () => {
    return selectedPaymentMethod === "telebirr" ? 10 : 13;
  };

  return (
    <div className="min-h-screen bg-indigo-50 py-12 relative overflow-hidden">
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full opacity-30 blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-pink-200 to-red-200 rounded-full opacity-25 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3">
                  <Palette className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-yellow-800" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-indigo-600 mb-3">
              Artist Payment Canvas
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              Set up your payment masterpiece to receive earnings from your
              beautiful art sales
            </p>
          </div>

          {/* Main Card */}
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-purple-100/50">
            <CardHeader className="bg-indigo-500/10 rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-800">
                    Payment Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Configure your financial canvas for seamless transactions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
                          <Banknote className="w-5 h-5 text-indigo-500" />
                          <span>Payment Method</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-500 transition-colors bg-white/50">
                              <SelectValue placeholder="Choose your preferred bank or payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white/95 backdrop-blur-sm">
                            {paymentMethods.map((method) => (
                              <SelectItem
                                key={method}
                                value={method}
                                className="hover:bg-indigo-50 focus:bg-indigo-50"
                              >
                                {method}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Shield className="w-5 h-5 text-green-500" />
                            <span>Account Number</span>
                          </div>
                          {selectedPaymentMethod && (
                            <span className="text-sm font-normal bg-indigo-100 px-3 py-1 rounded-full text-indigo-700">
                              {selectedPaymentMethod === "telebirr"
                                ? "10 digits required"
                                : "13 digits required"}
                            </span>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={getAccountNumberPlaceholder()}
                            maxLength={getAccountNumberMaxLength()}
                            className="h-12 border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-500 transition-colors bg-white/50 text-lg"
                            {...field}
                            onChange={(e) => {
                              // Only allow digits
                              const value = e.target.value.replace(/\D/g, "");
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accountHolderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
                          <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              A
                            </span>
                          </div>
                          <span>Account Holder Name</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the full name as it appears on your account"
                            className="h-12 border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-500 transition-colors bg-white/50 text-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="bg-indigo-200 h-px" />

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 px-8 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 px-8 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating Masterpiece...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4" />
                          <span>Save Payment Canvas</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">
                  Artist&apos;s Payment Guidelines
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span>Bank account numbers must be exactly 13 digits</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span>Telebirr numbers must be exactly 10 digits</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span>
                      Ensure the account holder name matches your official
                      documents
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span>Payment processing may take 3-5 business days</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
