"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Calendar,
  User,
  ArrowLeft,
  CheckCircle,
  Clock,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface Complaint {
  id: string;
  subject: string;
  message: string;
  response: string | null;
  createdAt: string;
  category: string;
  status: "PENDING" | "HANDLED";
}

export default function MyComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("/api/complaint/my");
        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }
        const data = await response.json();
        setComplaints(data);
      } catch (err) {
        setError("Failed to load complaints");
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "HANDLED":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Resolved
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-orange-100 text-orange-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Product Quality": "bg-red-100 text-red-800",
      "Shipping Issues": "bg-blue-100 text-blue-800",
      "Customer Service": "bg-purple-100 text-purple-800",
      "Payment Problems": "bg-yellow-100 text-yellow-800",
      "Website Issues": "bg-indigo-100 text-indigo-800",
      "Artist Concerns": "bg-pink-100 text-pink-800",
      Other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your complaints...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/user">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My Complaints
                </h1>
                <p className="text-gray-600">
                  View your submitted complaints and admin responses
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        {complaints.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No complaints submitted
              </h3>
              <p className="text-gray-600 mb-6">
                You haven&apos;t submitted any complaints yet.
              </p>
              <Button asChild>
                <Link href="/complain">Submit a Complaint</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-gray-900">
                        {complaint.subject}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {getStatusBadge(complaint.status)}
                        <Badge className={getCategoryColor(complaint.category)}>
                          {complaint.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(complaint.createdAt)}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Original Complaint */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-gray-500" />
                      <h4 className="font-semibold text-gray-900">
                        Your Message
                      </h4>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
                      <p className="text-gray-700 leading-relaxed">
                        {complaint.message}
                      </p>
                    </div>
                  </div>

                  {/* Admin Response */}
                  {complaint.response ? (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            A
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900">
                          Admin Response
                        </h4>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Responded
                        </Badge>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-400">
                        <p className="text-gray-700 leading-relaxed">
                          {complaint.response}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <h4 className="font-semibold text-gray-900">
                          Admin Response
                        </h4>
                        <Badge className="bg-orange-100 text-orange-800 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          Awaiting Response
                        </Badge>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-300">
                        <p className="text-orange-700 leading-relaxed">
                          Our team is reviewing your complaint and will respond
                          within 24-48 hours.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 text-center">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/dashboard/user/complain">
              <MessageSquare className="w-4 h-4 mr-2" />
              Submit New Complaint
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
