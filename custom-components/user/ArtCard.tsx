import Image from "next/image";
// import art from "@/public/images/img1.jpg";
// import { Plus, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddToCartButton } from "./addToCart";
// import { Description } from "@radix-ui/react-dialog";

const ArtCard = ({
  id,
  src,
  alt,
  description,
  artist,
  price,
}: {
  id?: string;
  src: string;
  artist: string;
  price: number;
  alt: string;
  description: string;
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      {/* Clickable Image opens Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative w-full h-64 cursor-pointer">
            <Image src={src} alt={alt} fill className="object-cover" />
          </div>
        </DialogTrigger>
        <DialogContent className="p-0 max-w-4xl">
          <DialogTitle className="text-center py-2">{description}</DialogTitle>
          <div className="relative w-full h-[90vh]">
            <Image
              src={src}
              alt="Full artwork"
              fill
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Details and actions */}
      <div className="flex justify-between p-4">
        <div className="">
          <div className="w-2/3">{description}</div>
          <div className="text-sm text-gray-500">By {artist}</div>
        </div>
        <div>
          <div className="text-md font-medium pe-3">{price}ETB</div>
          <div className="flex flex-col items-center gap-2">
            <AddToCartButton id={id!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
