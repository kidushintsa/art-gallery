"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormValues = {
  name: string;
  email: string;
  password: string;
  role: "artist" | "buyer";
  payoutMethod?: string;
  payoutAccount?: string;
  terms: boolean;
};

export default function SignupPage() {
  const [role, setRole] = useState<"artist" | "buyer">("buyer");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      role: "buyer",
    },
  });

  const onRoleChange = (value: "artist" | "buyer") => {
    setRole(value);
    setValue("role", value);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const payload =
        data.role === "artist"
          ? {
              name: data.name,
              email: data.email,
              password: data.password,
              role: "ARTIST",
              artistProfile: {
                payoutMethod: data.payoutMethod,
                payoutAccount: data.payoutAccount,
              },
            }
          : {
              name: data.name,
              email: data.email,
              password: data.password,
              role: "CUSTOMER",
            };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("Registration failed", json);
        alert(json.error || "Registration failed");
        return;
      }

      alert("Account created successfully!");
      router.push("/login");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold">
              Art Gallery
            </Link>
            <h1 className="text-2xl font-bold mt-6">Create an account</h1>
            <p className="text-gray-600 mt-2">Join our art community</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                I want to join as:
              </h3>
              <RadioGroup
                value={role}
                onValueChange={onRoleChange}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="artist" id="artist" />
                  <Label htmlFor="artist" className="cursor-pointer">
                    Artist
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buyer" id="buyer" />
                  <Label htmlFor="buyer" className="cursor-pointer">
                    Buyer/Explorer
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-gray-500 mt-2">
                {role === "artist"
                  ? "As an artist, you can showcase and sell your artwork to our community."
                  : "As a buyer, you can discover and purchase unique artwork from talented artists."}
              </p>
            </div>

            {/* Conditional fields for artists */}
            {role === "artist" && (
              <>
                <div>
                  <label
                    htmlFor="payoutMethod"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Payout Method
                  </label>
                  <Select
                    onValueChange={(value) => setValue("payoutMethod", value)}
                    defaultValue=""
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payout method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="venmo">Venmo</SelectItem>
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register("payoutMethod", {
                      required:
                        role === "artist" ? "Payout method is required" : false,
                    })}
                  />
                  {errors.payoutMethod && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.payoutMethod.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="payoutAccount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Payout Account Number
                  </label>
                  <Input
                    id="payoutAccount"
                    type="text"
                    placeholder="Account number"
                    {...register("payoutAccount", {
                      required:
                        role === "artist"
                          ? "Payout account number is required"
                          : false,
                    })}
                  />
                  {errors.payoutAccount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.payoutAccount.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register("terms", {
                  required: "You must agree to the terms and conditions",
                })}
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-primary hover:text-primary/90"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-primary hover:text-primary/90"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-xs">{errors.terms.message}</p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/90 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
