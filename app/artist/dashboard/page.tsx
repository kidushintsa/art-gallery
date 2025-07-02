"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Package, Clock, DollarSign } from "lucide-react";
import UploadArtwork from "@/custom-components/artist/uploadArtworks";
import MyArtworks from "@/custom-components/artist/myArtworks";
import SalesHistory from "@/custom-components/artist/salesHistory";
import ArtistOverview from "@/custom-components/artist/artworkOverview";

// Mock data - replace with real API calls
const mockArtistStats = {
  totalArtworks: 12,
  totalSold: 8,
  pendingApproval: 2,
  approved: 10,
  totalEarnings: 96000, // 80% of sales
};

const mockArtworks = [
  {
    id: "1",
    title: "Sunset Dreams",
    imageUrl: "/placeholder.svg?height=100&width=100",
    price: 15000,
    status: "APPROVED" as const,
    category: "PAINTING" as const,
    description: "A beautiful sunset painting",
    createdAt: "2024-01-15T10:30:00Z",
    sold: true,
  },
  {
    id: "2",
    title: "Abstract Thoughts",
    imageUrl: "/placeholder.svg?height=100&width=100",
    price: 25000,
    status: "PENDING" as const,
    category: "PAINTING" as const,
    description: "Modern abstract art piece",
    createdAt: "2024-01-14T14:20:00Z",
    sold: false,
  },
  {
    id: "3",
    title: "Mountain View",
    imageUrl: "/placeholder.svg?height=100&width=100",
    price: 30000,
    status: "APPROVED" as const,
    category: "PHOTOGRAPHY" as const,
    description: "Stunning mountain landscape",
    createdAt: "2024-01-13T09:15:00Z",
    sold: true,
  },
];

const mockSalesHistory = [
  {
    id: "1",
    artworkTitle: "Sunset Dreams",
    artworkId: "1",
    dateSold: "2024-01-16T11:30:00Z",
    salePrice: 15000,
    artistCut: 12000,
    payoutStatus: "PAID" as const,
    customerName: "Alice Johnson",
    orderId: "order1",
  },
  {
    id: "2",
    artworkTitle: "Mountain View",
    artworkId: "3",
    dateSold: "2024-01-15T09:20:00Z",
    salePrice: 30000,
    artistCut: 24000,
    payoutStatus: "UNPAID" as const,
    customerName: "Bob Wilson",
    orderId: "order2",
  },
];

export default function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [artworks, setArtworks] = useState(mockArtworks);

  const handleArtworkUpload = (artworkData: any) => {
    const newArtwork = {
      ...artworkData,
      id: Date.now().toString(),
      status: "PENDING" as const,
      createdAt: new Date().toISOString(),
      sold: false,
    };
    setArtworks((prev) => [newArtwork, ...prev]);
    console.log("New artwork uploaded:", newArtwork);
    setActiveTab("artworks"); // Switch to artworks tab to see the new upload
  };

  const handleArtworkUpdate = (id: string, updatedData: any) => {
    setArtworks((prev) =>
      prev.map((artwork) =>
        artwork.id === id ? { ...artwork, ...updatedData } : artwork
      )
    );
    console.log("Artwork updated:", id, updatedData);
  };

  const handleArtworkDelete = (id: string) => {
    setArtworks((prev) => prev.filter((artwork) => artwork.id !== id));
    console.log("Artwork deleted:", id);
  };

  // Calculate updated stats
  const currentStats = {
    totalArtworks: artworks.length,
    totalSold: artworks.filter((a) => a.sold).length,
    pendingApproval: artworks.filter((a) => a.status === "PENDING").length,
    approved: artworks.filter((a) => a.status === "APPROVED").length,
    totalEarnings: mockSalesHistory.reduce(
      (sum, sale) => sum + sale.artistCut,
      0
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Artist Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your artworks and track your sales
          </p>
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
                <ArtistOverview
                  stats={currentStats}
                  recentArtworks={artworks.slice(0, 5)}
                  onUploadClick={() => setActiveTab("upload")}
                />
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
                <UploadArtwork onUpload={handleArtworkUpload} />
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
                <MyArtworks
                  artworks={artworks}
                  onUpdate={handleArtworkUpdate}
                  onDelete={handleArtworkDelete}
                  onUploadClick={() => setActiveTab("upload")}
                />
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
                <SalesHistory salesHistory={mockSalesHistory} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
