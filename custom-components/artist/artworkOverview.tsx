"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar, DollarSign, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

interface ArtistStats {
  totalArtworks: number;
  totalSold: number;
  pendingApproval: number;
  approved: number;
  totalEarnings: number;
}

interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  status: "APPROVED" | "PENDING" | "REJECTED";
  createdAt: string;
  sold: boolean;
}

interface ArtistOverviewProps {
  stats: ArtistStats;
  recentArtworks: Artwork[];
  onUploadClick: () => void;
}

export default function ArtistOverview({
  stats,
  recentArtworks,
  onUploadClick,
}: ArtistOverviewProps) {
  const getStatusBadge = (status: string, sold: boolean) => {
    if (sold) {
      return <Badge className="bg-green-100 text-green-800">Sold</Badge>;
    }

    switch (status) {
      case "APPROVED":
        return <Badge className="bg-blue-100 text-blue-800">Approved</Badge>;
      case "PENDING":
        return <Badge className="bg-orange-100 text-orange-800">Pending</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onUploadClick}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload New Artwork
        </Button>
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          View All Artworks
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="text-lg text-indigo-900">
              Artwork Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Approved:</span>
              <span className="font-semibold text-blue-600">
                {stats.approved}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Pending:</span>
              <span className="font-semibold text-orange-600">
                {stats.pendingApproval}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Uploaded:</span>
              <span className="font-semibold text-gray-900">
                {stats.totalArtworks}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg text-green-900">
              Sales Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Artworks Sold:</span>
              <span className="font-semibold text-green-600">
                {stats.totalSold}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Earnings:</span>
              <span className="font-semibold text-green-600">
                {stats.totalEarnings.toLocaleString()} ETB
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Success Rate:</span>
              <span className="font-semibold text-gray-900">
                {stats.totalArtworks > 0
                  ? Math.round((stats.totalSold / stats.approved) * 100)
                  : 0}
                %
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Artworks */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Artworks
        </h3>
        <div className="space-y-4">
          {recentArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-20 h-20 flex-shrink-0">
                  <Image
                    src={artwork.imageUrl || "/placeholder.svg"}
                    alt={artwork.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h4 className="font-semibold text-gray-900">
                      {artwork.title}
                    </h4>
                    {getStatusBadge(artwork.status, artwork.sold)}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{artwork.price.toLocaleString()} ETB</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(artwork.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recentArtworks.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No artworks uploaded yet</p>
            <Button
              onClick={onUploadClick}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Your First Artwork
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
