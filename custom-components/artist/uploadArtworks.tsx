"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, X } from "lucide-react";
import Image from "next/image";

const categories = ["PAINTING", "SCULPTURE", "PHOTOGRAPHY"] as const;

const formSchema = z.object({
  title: z.string().min(2).max(100),
  price: z.number().min(1).max(1000000),
  category: z.enum(categories),
  description: z.string().max(500).optional(),
  imageFile: z.any(),
});

interface UploadArtworkProps {
  onUpload: (artworkData: any) => void;
}

export default function UploadArtwork({ onUpload }: UploadArtworkProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      imageFile: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!file) {
      alert("Please upload an image.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload to Cloudinary manually
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "artworks"); // your unsigned preset

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/duaaikjhp/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudData = await cloudRes.json();
      if (!cloudData.secure_url) throw new Error("Upload failed");

      const artworkData = {
        title: values.title,
        price: values.price,
        category: values.category,
        description: values.description,
        imageUrl: cloudData.secure_url, // ✅ fixed: use full URL
        status: "PENDING",
        createdAt: new Date().toISOString(),
      };

      onUpload(artworkData);

      form.reset();
      setFile(null);
      setPreviewUrl(null);

      alert("Uploaded successfully!");
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Failed to upload. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <FormItem>
            <FormLabel className="text-lg font-semibold">
              Artwork Image *
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) {
                    setFile(selected);
                    setPreviewUrl(URL.createObjectURL(selected));
                  }
                }}
              />
            </FormControl>
            {previewUrl && (
              <div className="relative mt-4">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setFile(null);
                    setPreviewUrl(null);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </FormItem>

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Your artwork title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (ETB)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting || !file}>
              {isSubmitting ? "Uploading..." : "Upload Artwork"}
              {!isSubmitting && <Check className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
