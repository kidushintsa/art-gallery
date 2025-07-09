export interface ArtCardProps {
  id: string;
  imageUrl: string;
  title: string;
  artist: string;
  price: number;
  onRemove?: (id: string) => void;
}