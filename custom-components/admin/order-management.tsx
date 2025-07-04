"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Mail,
  DollarSign,
  Package,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { User } from "./artwork-approval";

interface OrderItem {
  artwork: { title: string; imageUrl?: string };
  user: User;
  price: number;
}

interface Order {
  id: string;
  totalAmount: number;
  paymentStatus: string;
  createdAt: string;
  orderItems?: OrderItem[]; // ✅ FIX: was `orderItem`
  user: User;
}

interface OrdersManagementProps {
  orders: Order[];
}

export default function OrdersManagement({ orders }: OrdersManagementProps) {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const orderItems = order.orderItems ?? []; // ✅ FIXED from `order.orderItem`

        return (
          <Card key={order.id} className="border border-gray-200">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                  {order.paymentStatus}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{order.user.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{order.totalAmount.toLocaleString()} ETB</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  <span>
                    {orderItems.length} item{orderItems.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Button
                variant="ghost"
                onClick={() => toggleOrderExpansion(order.id)}
                className="w-full justify-between p-3 h-auto bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
              >
                <span className="font-medium text-blue-900">
                  View Order Items
                </span>
                {expandedOrders.has(order.id) ? (
                  <ChevronUp className="w-4 h-4 text-blue-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-blue-600" />
                )}
              </Button>

              {expandedOrders.has(order.id) && (
                <div className="mt-4 space-y-3">
                  <h4 className="font-medium text-gray-900">Order Items:</h4>
                  <div className="space-y-2">
                    {orderItems.length > 0 ? (
                      orderItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-12 h-12 flex-shrink-0">
                            <img
                              src={
                                item.artwork?.imageUrl ||
                                "/placeholder.svg?height=48&width=48"
                              }
                              alt={item.artwork?.title || "Artwork"}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {item.artwork?.title ?? "Untitled"}
                            </p>
                            <p className="text-sm text-gray-600">
                              by {item.user?.name ?? "Unknown Artist"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {item.price.toLocaleString()} ETB
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No items in this order.
                      </p>
                    )}
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center font-semibold text-lg">
                      <span>Total Amount:</span>
                      <span>{order.totalAmount.toLocaleString()} ETB</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
