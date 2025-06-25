// data/images.js
import { ImageData } from "@/entities/ImageData";
// example usage in your component or hook
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const res = await fetch(`${baseUrl}/api/artworks`);
const data = await res.json();
console.log(data.artworks);

const images: ImageData[] = data.artworks;
export default images;
