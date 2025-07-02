"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Calendar, DollarSign } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  status: "APPROVED" | "PENDING" | "REJECTED";
  category: "PAINTING" | "SCULPTURE" | "PHOTOGRAPHY";
  description?: string;
  createdAt: string;
  sold: boolean;
}

interface ArtworkCardProps {
  artwork: Artwork;
  onUpdate: (id: string, updatedData: any) => void;
  onDelete: (id: string) => void;
}

export default function ArtworkCard({
  artwork,
  onUpdate,
  onDelete,
}: ArtworkCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: artwork.title,
    price: artwork.price,
    category: artwork.category,
    description: artwork.description || "",
  });

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

  const getCategoryBadge = (category: string) => {
    const colors = {
      PAINTING: "bg-purple-100 text-purple-800",
      SCULPTURE: "bg-amber-100 text-amber-800",
      PHOTOGRAPHY: "bg-cyan-100 text-cyan-800",
    };
    return (
      <Badge
        className={
          colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
        }
      >
        {category}
      </Badge>
    );
  };

  const handleUpdate = () => {
    onUpdate(artwork.id, editData);
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    onDelete(artwork.id);
    setIsDeleteOpen(false);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48">
          <Image
            src={artwork.imageUrl || "/placeholder.svg"}
            alt={artwork.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            {getStatusBadge(artwork.status, artwork.sold)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
              {artwork.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {getCategoryBadge(artwork.category)}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span>{artwork.price.toLocaleString()} ETB</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(artwork.createdAt)}</span>
            </div>
          </div>

          {artwork.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {artwork.description}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Artwork</DialogTitle>
              <DialogDescription>
                Make changes to your artwork details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (ETB)</Label>
                <Input
                  id="price"
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({ ...editData, price: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={editData.category}
                  onValueChange={(value) =>
                    setEditData({ ...editData, category: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PAINTING">Painting</SelectItem>
                    <SelectItem value="SCULPTURE">Sculpture</SelectItem>
                    <SelectItem value="PHOTOGRAPHY">Photography</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Artwork</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {artwork.title}? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
