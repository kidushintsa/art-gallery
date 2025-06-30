"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Palette, MessageSquare, Users, ShoppingBag } from "lucide-react";
import ArtworkApproval from "@/custom-components/admin/artwork-approval";
import UsersManagement from "@/custom-components/admin/users-management";
import ComplaintsManagement from "@/custom-components/admin/complaints-managment";
import OrdersManagement from "@/custom-components/admin/order-management";

// Mock data - replace with real data fetching
const mockArtworks = [
  {
    id: "1",
    title: "Sunset Dreams",
    imageUrl: "/placeholder.svg?height=100&width=100",
    artistName: "John Doe",
    price: 15000,
    createdAt: "2024-01-15T10:30:00Z",
    status: "pending",
  },
  {
    id: "2",
    title: "Abstract Thoughts",
    imageUrl: "/placeholder.svg?height=100&width=100",
    artistName: "Jane Smith",
    price: 25000,
    createdAt: "2024-01-14T14:20:00Z",
    status: "pending",
  },
];

const mockComplaints = [
  {
    id: "1",
    subject: "Payment Issue",
    category: "Payment Problems",
    message: "My payment was charged but order not confirmed",
    userName: "Alice Johnson",
    userEmail: "alice@example.com",
    createdAt: "2024-01-16T09:15:00Z",
    response: "",
    status: "pending",
  },
  {
    id: "2",
    subject: "Damaged Artwork",
    category: "Product Quality",
    message: "The artwork arrived with scratches on the frame",
    userName: "Bob Wilson",
    userEmail: "bob@example.com",
    createdAt: "2024-01-15T16:45:00Z",
    response: "",
    status: "pending",
  },
];

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "artist",
    createdAt: "2024-01-10T08:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "customer",
    createdAt: "2024-01-12T10:30:00Z",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "customer",
    createdAt: "2024-01-14T14:15:00Z",
  },
];

const mockOrders = [
  {
    id: "1",
    totalAmount: 45000,
    paymentStatus: "completed",
    createdAt: "2024-01-16T11:30:00Z",
    userEmail: "alice@example.com",
    items: [
      { title: "Sunset Dreams", artistName: "John Doe", price: 15000 },
      { title: "Mountain View", artistName: "Jane Smith", price: 30000 },
    ],
  },
  {
    id: "2",
    totalAmount: 25000,
    paymentStatus: "pending",
    createdAt: "2024-01-15T09:20:00Z",
    userEmail: "bob@example.com",
    items: [
      { title: "Abstract Thoughts", artistName: "Jane Smith", price: 25000 },
    ],
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("artworks");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage artworks, complaints, users, and orders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Artworks
              </CardTitle>
              <Palette className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockArtworks.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Open Complaints
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockComplaints.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUsers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockOrders.length}</div>
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
            <TabsTrigger value="artworks">Artworks</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="artworks">
            <Card>
              <CardHeader>
                <CardTitle>Artwork Approval</CardTitle>
                <CardDescription>
                  Review and approve or reject submitted artworks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ArtworkApproval artworks={mockArtworks} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints">
            <Card>
              <CardHeader>
                <CardTitle>Complaints Management</CardTitle>
                <CardDescription>
                  View and respond to user complaints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComplaintsManagement complaints={mockComplaints} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Users Management</CardTitle>
                <CardDescription>
                  View and manage all platform users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UsersManagement users={mockUsers} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders Management</CardTitle>
                <CardDescription>
                  View all customer orders and their details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrdersManagement orders={mockOrders} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
