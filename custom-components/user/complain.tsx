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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Send } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  category: z.string().min(1, "Please select a complaint category"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

const complaintCategories = [
  "Product Quality",
  "Shipping Issues",
  "Customer Service",
  "Payment Problems",
  "Website Issues",
  "Artist Concerns",
  "Other",
];

export default function ComplainPage() {
  const { data: session } = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      subject: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      alert("Your complaint has been submitted successfully!");
      form.reset();
    } catch (e) {
      alert("Failed to submit complaint. " + e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            File a Complaint
          </h1>
          <p className="text-gray-600">
            We&apos;re sorry to hear about your experience. Please provide
            details about your complaint and we&apos;ll address it promptly.
          </p>
        </div>

        {/* Complaint Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">
              Complaint Details
            </CardTitle>
            <CardDescription>
              Please fill out all fields to help us understand and resolve your
              issue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complaint Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {complaintCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
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
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Brief summary of your complaint"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide a detailed description of your complaint..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>Submit Complaint</span>
                      </div>
                    )}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link
                      href={
                        session?.user.role === "CUSTOMER" || "customer"
                          ? "/dashboard/customer"
                          : ""
                      }
                    >
                      Cancel
                    </Link>
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">
            What happens next?
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• We&apos;ll review your complaint within 24-48 hours</li>
            <li>• Our team will investigate and respond with a resolution</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
