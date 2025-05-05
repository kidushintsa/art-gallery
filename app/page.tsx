import ArtCard from "@/custom-components/ArtCard";

export default function Home() {
  const array = [1, 2, 3, 4, 5, 6];

  return (
    <div className="grid grid-cols-3 gap-3 p-3">
      {array.map((c) => (
        <ArtCard key={c} />
      ))}
    </div>
  );
}
