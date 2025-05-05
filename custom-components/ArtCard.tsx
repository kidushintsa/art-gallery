import Image from "next/image";
import art from "@/public/images/img1.jpg";
import { Plus, ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ArtCard = () => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      {/* Clickable Image opens Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative w-full h-64 cursor-pointer">
            <Image src={art} alt="art" fill className="object-cover" />
          </div>
        </DialogTrigger>
        <DialogContent className="p-0 max-w-4xl">
          <div className="relative w-full h-[90vh]">
            <Image
              src={art}
              alt="Full artwork"
              fill
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Details and actions */}
      <div className="flex justify-between p-4">
        <div>
          <div className="text-lg font-semibold">Habesha art</div>
          <div className="text-sm text-gray-500">By Alemitu Kebede</div>
        </div>
        <div className="text-md font-medium">10,000 ETB</div>
        <div className="flex flex-col items-center gap-2">
          <button className="border-2 border-black rounded-full p-1">
            <Plus size={16} strokeWidth={3} />
          </button>
          <ShoppingCart size={24} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
