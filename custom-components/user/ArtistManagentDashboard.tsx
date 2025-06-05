import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, TrendingUp, Users, Activity } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  const artworks = [
    {
      id: 1,
      artist: "Kelas Abdoune",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      artist: "Daniel Arsila",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      artist: "Noel Gessner",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      artist: "Donfre walker",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      artist: "Kelas Abdoune",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      artist: "Kelas Abdoune",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 7,
      artist: "Daniel Arsila",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 8,
      artist: "Noel Gessner",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 9,
      artist: "Donfre walker",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 10,
      artist: "Kelas Abdoune",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 11,
      artist: "Kelas Abdoune",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 12,
      artist: "Daniel Arsila",
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  const transactions = [
    {
      id: 1,
      amount: "1k",
      date: "Dec 12th",
      artist: "Kelas",
      project: "ETHIO",
    },
    {
      id: 2,
      amount: "2k",
      date: "Dec 10th",
      artist: "Daniel",
      project: "ART2",
    },
    { id: 3, amount: "1k", date: "Nov 8th", artist: "Noel", project: "PAINT" },
  ];

  const menuItems = [
    { name: "Art works", active: true },
    { name: "Attendance", active: false },
    { name: "Department detail", active: false },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-6">
          {/* Profile Section */}
          <div className="flex items-center gap-3 mb-8">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Kelas Abdoune"
              />
              <AvatarFallback>KA</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-gray-900">Kelas Abdoune</h3>
              <p className="text-sm text-gray-600">kelasabdoune@gmail.com</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                  item.active
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Art works Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Art works</h2>
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-700 p-0"
              >
                See all
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              {artworks.map((artwork) => (
                <div key={artwork.id} className="group cursor-pointer">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-gray-100">
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.artist}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <p className="text-xs text-gray-700 text-center font-medium">
                    {artwork.artist}
                  </p>
                </div>
              ))}
            </div>

            <Button className="w-full border-2 border-dashed border-gray-300 bg-transparent hover:bg-gray-50 text-gray-600 h-24">
              <Plus className="h-6 w-6 mr-2" />
              UPLOAD
            </Button>
          </div>

          {/* Stats and Transactions Row */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Stats Cards */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Total Visitors</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    4,818
                  </span>
                  <span className="text-sm text-green-600">+2.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Engagement Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    118,818
                  </span>
                  <span className="text-sm text-green-600">+1.2%</span>
                </div>
              </CardContent>
            </Card>

            {/* Transactions */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Transactions</CardTitle>
                  <Button
                    variant="link"
                    className="text-blue-600 hover:text-blue-700 p-0 text-sm"
                  >
                    See All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium">
                          {transaction.amount}
                        </span>
                        <span className="text-gray-600">
                          {transaction.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">
                          {transaction.artist}
                        </span>
                        <span className="text-blue-600">
                          {transaction.project}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue and Chart Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Revenue Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="text-sm text-gray-500">
                    Monthly Transaction
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    80,000 ETB
                  </span>
                  <span className="text-sm text-gray-500">+10%</span>
                </div>
                <Button
                  variant="link"
                  className="text-blue-600 hover:text-blue-700 p-0 text-sm"
                >
                  See more
                </Button>
              </CardContent>
            </Card>

            {/* Chart Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Overview Report
                    </span>
                  </div>
                  <span className="text-sm text-blue-600">All time view</span>
                </div>

                {/* Simplified Chart Representation */}
                <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-end justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-200/50 to-transparent"></div>
                  <div className="text-center z-10">
                    <div className="text-2xl font-bold text-gray-900">
                      98.78%
                    </div>
                    <div className="text-sm text-gray-600">Total Sales</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-6">
              <Button
                variant="link"
                className="text-gray-600 hover:text-gray-900 p-0"
              >
                Home
              </Button>
              <Button
                variant="link"
                className="text-gray-600 hover:text-gray-900 p-0"
              >
                Careers
              </Button>
              <Button
                variant="link"
                className="text-gray-600 hover:text-gray-900 p-0"
              >
                Legal & Policy
              </Button>
            </div>
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700 p-0"
            >
              Need a help?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
