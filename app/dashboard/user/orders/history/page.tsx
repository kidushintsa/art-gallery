"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, CreditCard, Package, User } from "lucide-react";
import Image from "next/image";

interface Artist {
  id: string;
  name: string | null;
  email: string | null;
}

interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  user: Artist;
}

interface OrderItem {
  id: string;
  price: number;
  artwork: Artwork;
}

interface Order {
  id: string;
  totalAmount: number;
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  paymentMethod: string | null;
  createdAt: string;
  orderItems: OrderItem[];
}

interface OrderHistoryResponse {
  orders: Order[];
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // In a real app, you'd get this from authentication context
  const userId = "user_id_here"; // Replace with actual user ID from auth

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(`/api/orders/history?userId=${userId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch order history");
        }

        const data: OrderHistoryResponse = await response.json();
        setOrders(data.orders);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [userId]);

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your order history...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p>Error: {error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order History
          </h1>
          <p className="text-gray-600">View all your artwork purchases</p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No orders yet
                </h3>
                <p className="text-gray-600">
                  You haven&apos;t made any purchases yet.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.id.slice(-8)}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <CalendarDays className="h-4 w-4" />
                        {formatDate(order.createdAt)}
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <Badge
                        className={getPaymentStatusColor(order.paymentStatus)}
                      >
                        {order.paymentStatus}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CreditCard className="h-4 w-4" />
                        {order.paymentMethod || "N/A"}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {order.orderItems.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex gap-4">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={item.artwork.imageUrl || "/placeholder.svg"}
                              alt={item.artwork.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">
                              {item.artwork.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {item.artwork.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                by {item.artwork.user.name || "Unknown Artist"}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>

                        {index < order.orderItems.length - 1 && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
