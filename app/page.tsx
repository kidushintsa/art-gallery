// import NavLink from "@/custom-components/AdminNavLink";
// import AdminPanel from "@/custom-components/AdminPanel";
// import ArtCardGrid from "@/custom-components/ArtCardGrid";
// import Hero from "@/custom-components/Hero";

import AdminInfoBar from "@/custom-components/admin/AdminInfoBar";
import AdminPanel from "@/custom-components/admin/AdminPanel";

// import AdminInfoBar from "@/custom-components/admin/AdminInfoBar";

// import { ArtistNavLinkData } from "@/data/ArtistNavData";
export default function Home() {
  return (
    <div className="flex">
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
      <AdminPanel />
      <AdminInfoBar />
    </div>
  );
}
