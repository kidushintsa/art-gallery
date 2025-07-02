"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DollarSign,
  User,
  CreditCard,
  Calendar,
  Package,
  Check,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface OrderItem {
  id: string;
  price: number;
  artistCut: number;
  payoutStatus: "UNPAID" | "PAID";
  artwork: {
    id: string;
    title: string;
    imageUrl: string;
  };
  order: {
    id: string;
    totalAmount: number;
    createdAt: string;
    user: {
      name: string;
      email: string;
    };
  };
}

interface ArtistPayout {
  artistId: string;
  artistName: string;
  artistEmail: string;
  payoutMethod: string;
  payoutAccount: string;
  accountHolderName: string;
  unpaidItems: OrderItem[];
  totalUnpaidAmount: number;
}

interface ArtistPayoutsProps {
  artistPayouts: ArtistPayout[];
  onMarkAsPaid: (artistId: string, orderItemIds: string[]) => void;
}

export default function ArtistPayouts({
  artistPayouts,
  onMarkAsPaid,
}: ArtistPayoutsProps) {
  const [processingPayouts, setProcessingPayouts] = useState<Set<string>>(
    new Set()
  );

  const handleMarkAsPaid = async (artistId: string, orderItemIds: string[]) => {
    setProcessingPayouts((prev) => new Set(prev).add(artistId));

    try {
      await onMarkAsPaid(artistId, orderItemIds);
      console.log(`Marked payout as paid for artist ${artistId}`);
    } catch (error) {
      console.error("Error marking payout as paid:", error);
    } finally {
      setProcessingPayouts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(artistId);
        return newSet;
      });
    }
  };

  const getPaymentMethodColor = (method: string) => {
    if (method?.toLowerCase().includes("telebirr")) {
      return "bg-orange-100 text-orange-800";
    }
    return "bg-blue-100 text-blue-800";
  };

  if (artistPayouts.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No pending artist payouts</p>
        <p className="text-gray-400 text-sm">
          All artists have been paid for their sales
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {artistPayouts.map((artistPayout) => (
        <Card key={artistPayout.artistId} className="border border-gray-200">
          <CardHeader className="bg-gray-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {artistPayout.artistName}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {artistPayout.artistEmail}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2">
                <div className="text-2xl font-bold text-green-600">
                  {artistPayout.totalUnpaidAmount.toLocaleString()} ETB
                </div>
                <p className="text-sm text-gray-500">
                  {artistPayout.unpaidItems.length} unpaid item
                  {artistPayout.unpaidItems.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Payment Method Info */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payment Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Payment Method:</span>
                  <div className="mt-1">
                    <Badge
                      className={getPaymentMethodColor(
                        artistPayout.payoutMethod
                      )}
                    >
                      {artistPayout.payoutMethod}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Account Number:</span>
                  <p className="font-mono font-medium mt-1">
                    {artistPayout.payoutAccount}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Account Holder:</span>
                  <p className="font-medium mt-1">
                    {artistPayout.accountHolderName}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-gray-900">Unpaid Sales:</h4>
              {artistPayout.unpaidItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 bg-white"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                      <img
                        src={item.artwork.imageUrl || "/placeholder.svg"}
                        alt={item.artwork.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <h5 className="font-medium text-gray-900">
                        {item.artwork.title}
                      </h5>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          <span>
                            Sale Price: {item.price.toLocaleString()} ETB
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          <span className="font-medium text-green-600">
                            Artist Cut: {item.artistCut.toLocaleString()} ETB
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Sold: {formatDate(item.order.createdAt)}</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-500">
                        <span>Order #{item.order.id}</span>
                        <span className="mx-2">•</span>
                        <span>Customer: {item.order.user.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Payout Summary */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Total Amount to Pay:</p>
                <p className="text-2xl font-bold text-gray-900">
                  {artistPayout.totalUnpaidAmount.toLocaleString()} ETB
                </p>
                <p className="text-xs text-gray-500">
                  (80% of total sales - 20% platform fee already deducted)
                </p>
              </div>

              <Button
                onClick={() =>
                  handleMarkAsPaid(
                    artistPayout.artistId,
                    artistPayout.unpaidItems.map((item) => item.id)
                  )
                }
                disabled={processingPayouts.has(artistPayout.artistId)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                size="lg"
              >
                {processingPayouts.has(artistPayout.artistId) ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Mark as Paid</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
