import ArtCardGrid from "@/custom-components/user/ArtCardGrid";
import Hero from "@/custom-components/user/Hero";
export default function Home() {
  return (
    <>
      {/* <Hero />console.log('Rendering Home component');
      <header className="ps-3 pt-4 font-semibold font-serif">
        <h1>Discover Art You Love From the Local</h1>
        <h1>Leading Online Gallery</h1>
      </header>
      <ArtCardGrid /> */}
      {/* <div className="flex flex-col">
        {NavLinkData.map(({ name, href, children }) => (
          <AdminNavLink key={name} name={name} href={href}>
            {children}
          </AdminNavLink>
        ))}
      </div> */}
      {/* <Admin /> */}
      <Hero />
      {/* //the data inside the art card is demo data, in production the real data inside the card comes from backend */}
      <ArtCardGrid />
    </>
  );
}
