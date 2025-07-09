"use client";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import React from "react";

const ComplaintSubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <Button type="submit" disabled={isSubmitting} className="flex-1">
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Submitting...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4" />
          <span>Submit Complaint</span>
        </div>
      )}
    </Button>
  );
};

export default ComplaintSubmitButton;
