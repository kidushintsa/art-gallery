"use client";

import { useState, useEffect, Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Palette, Package, Clock, DollarSign, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import UploadArtwork from "@/custom-components/artist/uploadArtworks";
import MyArtworks from "@/custom-components/artist/myArtworks";
import SalesHistory, {
  type Sale,
} from "@/custom-components/artist/salesHistory"; // import Sale type here if exported
import ArtistOverview from "@/custom-components/artist/artworkOverview";

interface MyArtwork {
  id: string;
  title: string;
  description: string | undefined;
  imageUrl: string;
  price: number;
  category: "PAINTING" | "SCULPTURE" | "PHOTOGRAPHY"; // adjust as per your schema
  status: "PENDING" | "APPROVED" | "REJECTED"; // adjust as per your schema
  sold: boolean;
  createdAt: string; // or `Date` depending on how you're handling it
  updatedAt: string;
  userId: string;
}
interface updatedData {
  title: string;
  price: number;
  category: "PAINTING" | "SCULPTURE" | "PHOTOGRAPHY";
  description: string | "";
}

export default function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [artworks, setArtworks] = useState<MyArtwork[]>([]);
  const [salesHistory, setSalesHistory] = useState<Sale[]>([]);

  // ✅ Fetch artworks for the current artist by session email
  const fetchArtworks = async () => {
    try {
      const res = await fetch("/api/artworks/my");
      if (!res.ok) throw new Error("Failed to fetch artworks");
      const data = await res.json();
      setArtworks(data);
    } catch (err) {
      console.error("Error fetching artworks:", err);
      setArtworks([]);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchArtworks();
    async function fetchSalesHistory() {
      try {
        const res = await fetch("/api/sales-history");
        if (!res.ok) throw new Error("Failed to fetch sales history");
        const data = await res.json();
        const mappedData: Sale[] = data.map((item: Sale) => ({
          id: item.id,
          artistCut: item.artistCut,
          price: item.price ?? 0,
          payoutStatus: item.payoutStatus,
          artwork: {
            id: item.artwork.id,
            title: item.artwork.title,
            imageUrl: item.artwork.imageUrl,
            user: {
              id: item.artwork.user.id,
              name: item.artwork.user.name,
              email: item.artwork.user.email,
              payoutMethod: item.artwork.user.payoutMethod,
              payoutAccount: item.artwork.user.payoutAccount,
              AccountHolderName: item.artwork.user.AccountHolderName,
            },
          },
          order: {
            id: item.order.id,
            totalAmount: item.order.totalAmount,
            createdAt: item.order.createdAt,
            user: {
              name: item.order.user.name,
              email: item.order.user.email,
            },
          },
        }));
        setSalesHistory(mappedData);
      } catch (error) {
        console.error("Error fetching sales history:", error);
        setSalesHistory([]);
      }
    }

    fetchSalesHistory();
  }, []);

  // ✅ Call after upload to refresh
  const handleArtworkUpload = async () => {
    await fetchArtworks();
    setActiveTab("artworks");
  };

  const handleArtworkUpdate = async (id: string, updatedData: updatedData) => {
    try {
      const res = await fetch(`/api/artworks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) {
        throw new Error("Failed to update artwork");
      }
      await fetchArtworks(); // Refresh with updated data
    } catch (error) {
      console.error("Error updating artwork:", error);
    }
  };

  const handleArtworkDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/artworks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete artwork");
      }
      await fetchArtworks(); // Refresh the artworks list
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const currentStats = {
    totalArtworks: artworks.length,
    totalSold: salesHistory.length, // ✅ use actual sales history
    pendingApproval: artworks.filter((a) => a.status === "PENDING").length,
    approved: artworks.filter((a) => a.status === "APPROVED").length,
    totalEarnings: salesHistory.reduce((sum, sale) => sum + sale.artistCut, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Artist Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your artworks and track your sales
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 w-fit bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">
                Total Artworks
              </CardTitle>
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Palette className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {currentStats.totalArtworks}
              </div>
              <p className="text-xs text-blue-600 mt-1">Uploaded</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">
                Total Sold
              </CardTitle>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {currentStats.totalSold}
              </div>
              <p className="text-xs text-green-600 mt-1">Artworks sold</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">
                Pending Approval
              </CardTitle>
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">
                {currentStats.pendingApproval}
              </div>
              <p className="text-xs text-orange-600 mt-1">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">
                Total Earnings
              </CardTitle>
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                {currentStats.totalEarnings.toLocaleString()} ETB
              </div>
              <p className="text-xs text-purple-600 mt-1">Your 80% share</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="artworks">My Artworks</TabsTrigger>
            <TabsTrigger value="sales">Sales History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Overview</CardTitle>
                <CardDescription>
                  Overview of your uploaded artworks and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<p>Loading......</p>}>
                  <ArtistOverview
                    stats={currentStats}
                    recentArtworks={artworks.slice(0, 5)}
                    onUploadClick={() => setActiveTab("upload")}
                  />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Artwork</CardTitle>
                <CardDescription>
                  Share your creativity with the world
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<p>Loading......</p>}>
                  <UploadArtwork onUpload={handleArtworkUpload} />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="artworks">
            <Card>
              <CardHeader>
                <CardTitle>My Artworks</CardTitle>
                <CardDescription>
                  Manage all your uploaded artworks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<p>Loading......</p>}>
                  <MyArtworks
                    artworks={artworks}
                    onUpdate={handleArtworkUpdate}
                    onDelete={handleArtworkDelete}
                    onUploadClick={() => setActiveTab("upload")}
                  />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Sales History</CardTitle>
                <CardDescription>
                  Track your artwork sales and earnings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<p>Loading......</p>}>
                  <SalesHistory salesHistory={salesHistory} />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
