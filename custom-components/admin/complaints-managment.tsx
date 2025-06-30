"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Mail, User, Send } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Complaint {
  id: string;
  subject: string;
  category: string;
  message: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  response: string;
  status: string;
}

interface ComplaintsManagementProps {
  complaints: Complaint[];
}

export default function ComplaintsManagement({
  complaints,
}: ComplaintsManagementProps) {
  const [complaintList, setComplaintList] = useState(complaints);
  const [responses, setResponses] = useState<Record<string, string>>({});

  const handleResponseChange = (id: string, response: string) => {
    setResponses((prev) => ({ ...prev, [id]: response }));
  };

  const handleSubmitResponse = (id: string) => {
    const response = responses[id];
    if (!response?.trim()) return;

    setComplaintList((prev) =>
      prev.map((complaint) =>
        complaint.id === id
          ? { ...complaint, response, status: "handled" }
          : complaint
      )
    );

    setResponses((prev) => ({ ...prev, [id]: "" }));
    console.log(`Response submitted for complaint ${id}:`, response);
    // In real app: API call to save response
  };

  if (complaintList.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No complaints to review</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {complaintList.map((complaint) => (
        <Card key={complaint.id} className="border border-gray-200">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <CardTitle className="text-lg">{complaint.subject}</CardTitle>
              <Badge
                variant={
                  complaint.status === "handled" ? "default" : "secondary"
                }
                className={
                  complaint.status === "handled"
                    ? "bg-green-100 text-green-800"
                    : ""
                }
              >
                {complaint.status}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{complaint.userName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{complaint.userEmail}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(complaint.createdAt)}</span>
              </div>
            </div>

            <Badge variant="outline" className="w-fit">
              {complaint.category}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Original Message */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Complaint Message:
              </h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                {complaint.message}
              </p>
            </div>

            {/* Existing Response */}
            {complaint.response && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Admin Response:
                </h4>
                <p className="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                  {complaint.response}
                </p>
              </div>
            )}

            {/* Response Form */}
            {complaint.status !== "handled" && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Your Response:</h4>
                <Textarea
                  placeholder="Type your response to the customer..."
                  value={responses[complaint.id] || ""}
                  onChange={(e) =>
                    handleResponseChange(complaint.id, e.target.value)
                  }
                  className="min-h-[100px]"
                />
                <Button
                  onClick={() => handleSubmitResponse(complaint.id)}
                  disabled={!responses[complaint.id]?.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Response
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
