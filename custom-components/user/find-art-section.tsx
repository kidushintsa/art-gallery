import Image from "next/image";

interface FindArtSectionProps {
  image: string;
  title: string;
  description: string;
}

export function FindArtSection({
  image,
  title,
  description,
}: FindArtSectionProps) {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square max-w-md mx-auto md:mx-0">
            <Image
              src={image || "/placeholder.svg"}
              alt="Featured artwork"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
