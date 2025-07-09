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
interface updatedData {
  title: string;
  price: number;
  category: "PAINTING" | "SCULPTURE" | "PHOTOGRAPHY";
  description: string | "";
}
export interface ArtworkCardProps {
  artwork: Artwork;
  onUpdate: (id: string, updatedData: updatedData) => void;
  onDelete: (id: string) => void;
}
