"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { DollarSign, Users, Package } from "lucide-react";
import ArtistPayouts from "@/custom-components/user/artistPayouts";

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
  totalUnpaidAmount: number;
  unpaidItems: OrderItem[];
}

export default function Page() {
  const [artistPayouts, setArtistPayouts] = useState<ArtistPayout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/artist-payouts");
      const data: ArtistPayout[] = await res.json();
      setArtistPayouts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching payouts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  const handleMarkAsPaid = async (artistId: string, orderItemIds: string[]) => {
    try {
      const res = await fetch("/api/artist-payouts/mark-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderItemIds }),
      });

      const data = await res.json();

      if (data.success) {
        // Refetch after marking as paid
        await fetchPayouts();
      } else {
        console.error("Failed to mark as paid:", data.error);
      }
    } catch (err) {
      console.error("Error marking as paid:", err);
    }
  };

  const totalPendingAmount = artistPayouts.reduce(
    (sum, group) => sum + group.totalUnpaidAmount,
    0
  );
  const totalArtists = artistPayouts.length;
  const totalItems = artistPayouts.reduce(
    (sum, group) => sum + group.unpaidItems.length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Artist Payouts</h1>
          <p className="text-gray-600">
            Process payments to artists for sold artworks (80% share).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Total Pending",
              value: totalPendingAmount,
              icon: DollarSign,
            },
            {
              title: "Artists Waiting",
              value: totalArtists,
              icon: Users,
            },
            {
              title: "Unpaid Items",
              value: totalItems,
              icon: Package,
            },
          ].map(({ title, value, icon: Icon }) => (
            <Card key={title}>
              <CardHeader className="flex justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-700" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {value.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Artist Payouts</CardTitle>
            <CardDescription>
              Review sold artworks and mark them as paid.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500 text-sm">Loading payouts...</p>
            ) : (
              <ArtistPayouts
                artistPayouts={artistPayouts}
                onMarkAsPaid={handleMarkAsPaid}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
