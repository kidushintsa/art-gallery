"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Palette,
  MessageSquare,
  Users,
  ShoppingBag,
  LogOut,
  DollarSign,
} from "lucide-react";
import { signOut } from "next-auth/react";
import ArtworkApproval from "@/custom-components/admin/artwork-approval";
import UsersManagement from "@/custom-components/admin/users-management";
import ComplaintsManagement from "@/custom-components/admin/complaints-managment";
import OrdersManagement from "@/custom-components/admin/order-management";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("artworks");
  const [artworks, setArtworks] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const [artworksRes, complaintsRes, usersRes, ordersRes] = await Promise.all(
      [
        fetch("/api/admin/pending-artworks"),
        fetch("/api/admin/complaints"),
        fetch("/api/admin/users"),
        fetch("/api/admin/orders"),
      ]
    );

    const [artworksData, complaintsData, usersData, ordersData] =
      await Promise.all([
        artworksRes.json(),
        complaintsRes.json(),
        usersRes.json(),
        ordersRes.json(),
      ]);

    console.log("Artworks:", artworksData);
    console.log("Complaints:", complaintsData);
    console.log("Users:", usersData);
    console.log("Orders:", ordersData);

    setArtworks(artworksData);
    setComplaints(complaintsData);
    setUsers(usersData);
    setOrders(ordersData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage artworks, complaints, users, and orders
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => router.push("/admin/artist-payouts")}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Artist Payouts
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 w-fit bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">
                Pending Artworks
              </CardTitle>
              <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
                <Palette className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">
                {artworks.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-red-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-800">
                Open Complaints
              </CardTitle>
              <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">
                {complaints.length}
              </div>
              <p className="text-xs text-red-600 mt-1">Need attention</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">
                Total Users
              </CardTitle>
              <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {users.length}
              </div>
              <p className="text-xs text-blue-600 mt-1">Registered members</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">
                Total Orders
              </CardTitle>
              <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {orders.length}
              </div>
              <p className="text-xs text-green-600 mt-1">All time sales</p>
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
                <ArtworkApproval artworks={artworks} refresh={fetchData} />
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
                <ComplaintsManagement
                  complaints={complaints}
                  refresh={fetchData}
                />
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
                <UsersManagement users={users} />
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
                <OrdersManagement orders={orders} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
