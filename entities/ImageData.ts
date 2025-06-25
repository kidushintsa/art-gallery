export interface ImageData {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  approved: boolean;
  createdAt: string; // ISO string (or use `Date` if you parse it)
  artistId: string;
  user: {
    name: string;
    email: string;
  };
}
