import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminPanel() {
  const userComplaints = [
    {
      id: 1,
      username: "@davidstorm",
      email: "kylerobinson@gmail.com",
      complaint: "How do I buy a Bubble artwork with my checkout?",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      username: "@kylerobinson",
      email: "kylerobinson@gmail.com",
      complaint: "How do I buy a Bubble artwork with my checkout?",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      username: "@davidstorm",
      email: "kylerobinson@gmail.com",
      complaint: "How do I buy a Bubble artwork with my checkout?",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      username: "@kylerobinson",
      email: "kylerobinson@gmail.com",
      complaint: "How do I buy a Bubble artwork with my checkout?",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      username: "@davidstorm",
      email: "kylerobinson@gmail.com",
      complaint: "How do I buy a Bubble artwork with my checkout?",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const artistComplaints = [
    {
      id: 1,
      username: "@kylerobinson",
      email: "kylerobinson@gmail.com",
      complaint: "How do I buy a Bubble artwork with my checkout?",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      username: "@kylerobinson",
      email: "kylerobinson@gmail.com",
      complaint: "How do I buy a Bubble artwork with my checkout?",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      username: "@kylerobinson",
      email: "kylerobinson@gmail.com",
      complaint: "How do I buy a Bubble artwork with my checkout?",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      username: "@kylerobinson",
      email: "kylerobinson@gmail.com",
      complaint: "How do I buy a Bubble artwork with my checkout?",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      username: "@kylerobinson",
      email: "kylerobinson@gmail.com",
      complaint: "How do I buy a Bubble artwork with my checkout?",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-medium text-gray-900">Admin Panel</h1>
        </div>

        {/* Main Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Complaint from User and Artist
        </h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Complaint by User */}
          <div className="bg-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Complaint by User
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Last month
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Last week</DropdownMenuItem>
                  <DropdownMenuItem>Last month</DropdownMenuItem>
                  <DropdownMenuItem>Last 3 months</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-4">
              {userComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={complaint.avatar || "/placeholder.svg"}
                      alt={complaint.username}
                    />
                    <AvatarFallback>
                      {complaint.username.slice(1, 3).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">
                        {complaint.username}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {complaint.email}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {complaint.complaint}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 text-sm shrink-0"
                  >
                    Reply
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Complaint by Artist */}
          <div className="bg-gray-200  rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Complaint by Artist
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Last month
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Last week</DropdownMenuItem>
                  <DropdownMenuItem>Last month</DropdownMenuItem>
                  <DropdownMenuItem>Last 3 months</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-4">
              {artistComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={complaint.avatar || "/placeholder.svg"}
                      alt={complaint.username}
                    />
                    <AvatarFallback>
                      {complaint.username.slice(1, 3).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">
                        {complaint.username}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {complaint.email}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {complaint.complaint}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 text-sm shrink-0"
                  >
                    Reply
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
