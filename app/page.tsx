import ArtCardGrid from "@/custom-components/ArtCardGrid";
import Hero from "@/custom-components/Hero";
export default function Home() {
  return (
    <>
      <Hero />
      <header className="ps-3 pt-4 font-semibold font-serif">
        <h1>Discover Art You Love From the Local</h1>
        <h1>Leading Online Gallery</h1>
      </header>
      <ArtCardGrid />
    </>
  );
}
