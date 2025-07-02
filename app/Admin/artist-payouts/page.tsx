"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Users, Package } from "lucide-react";
import ArtistPayouts from "@/custom-components/user/artistPayouts";

// Mock data - replace with real API calls
const mockArtistPayouts = [
  {
    artistId: "artist1",
    artistName: "John Doe",
    artistEmail: "john@example.com",
    payoutMethod: "Commercial Bank of Ethiopia (CBE)",
    payoutAccount: "1234567890123",
    accountHolderName: "John Doe",
    totalUnpaidAmount: 24000, // 80% of 30000
    unpaidItems: [
      {
        id: "item1",
        price: 15000,
        artistCut: 12000, // 80% of 15000
        payoutStatus: "UNPAID" as const,
        artwork: {
          id: "art1",
          title: "Sunset Dreams",
          imageUrl: "/placeholder.svg?height=64&width=64",
        },
        order: {
          id: "order1",
          totalAmount: 15000,
          createdAt: "2024-01-16T11:30:00Z",
          user: {
            name: "Alice Johnson",
            email: "alice@example.com",
          },
        },
      },
      {
        id: "item2",
        price: 15000,
        artistCut: 12000, // 80% of 15000
        payoutStatus: "UNPAID" as const,
        artwork: {
          id: "art2",
          title: "Mountain View",
          imageUrl: "/placeholder.svg?height=64&width=64",
        },
        order: {
          id: "order2",
          totalAmount: 15000,
          createdAt: "2024-01-15T09:20:00Z",
          user: {
            name: "Bob Wilson",
            email: "bob@example.com",
          },
        },
      },
    ],
  },
  {
    artistId: "artist2",
    artistName: "Jane Smith",
    artistEmail: "jane@example.com",
    payoutMethod: "telebirr",
    payoutAccount: "0912345678",
    accountHolderName: "Jane Smith",
    totalUnpaidAmount: 20000, // 80% of 25000
    unpaidItems: [
      {
        id: "item3",
        price: 25000,
        artistCut: 20000, // 80% of 25000
        payoutStatus: "UNPAID" as const,
        artwork: {
          id: "art3",
          title: "Abstract Thoughts",
          imageUrl: "/placeholder.svg?height=64&width=64",
        },
        order: {
          id: "order3",
          totalAmount: 25000,
          createdAt: "2024-01-14T14:20:00Z",
          user: {
            name: "Charlie Brown",
            email: "charlie@example.com",
          },
        },
      },
    ],
  },
];

export default function Page() {
  const [artistPayouts, setArtistPayouts] = useState(mockArtistPayouts);

  const handleMarkAsPaid = async (artistId: string, orderItemIds: string[]) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Remove the artist from the list after marking as paid
    setArtistPayouts((prev) =>
      prev.filter((artist) => artist.artistId !== artistId)
    );

    console.log(
      `Marked items ${orderItemIds.join(", ")} as paid for artist ${artistId}`
    );
    // In real app: API call to update payoutStatus to PAID and create Payout record
  };

  const totalPendingAmount = artistPayouts.reduce(
    (sum, artist) => sum + artist.totalUnpaidAmount,
    0
  );
  const totalArtists = artistPayouts.length;
  const totalItems = artistPayouts.reduce(
    (sum, artist) => sum + artist.unpaidItems.length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Artist Payouts
          </h1>
          <p className="text-gray-600">
            Process payments to artists for their sold artworks
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">
                Total Pending
              </CardTitle>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {totalPendingAmount.toLocaleString()} ETB
              </div>
              <p className="text-xs text-green-600 mt-1">Amount to pay out</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">
                Artists Waiting
              </CardTitle>
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {totalArtists}
              </div>
              <p className="text-xs text-blue-600 mt-1">Need payment</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">
                Unpaid Items
              </CardTitle>
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                {totalItems}
              </div>
              <p className="text-xs text-purple-600 mt-1">Sold artworks</p>
            </CardContent>
          </Card>
        </div>

        {/* Payouts List */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Artist Payouts</CardTitle>
            <CardDescription>
              Review and process payments to artists for their sold artworks.
              80% goes to the artist, 20% is the platform fee.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ArtistPayouts
              artistPayouts={artistPayouts}
              onMarkAsPaid={handleMarkAsPaid}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
