// import NavLink from "@/custom-components/AdminNavLink";
// import AdminPanel from "@/custom-components/AdminPanel";
// import ArtCardGrid from "@/custom-components/ArtCardGrid";
// import Hero from "@/custom-components/Hero";

import AdminInfoBar from "@/custom-components/admin/AdminInfoBar";
import AdminPanel from "@/custom-components/admin/AdminPanel";
import ProfitBox from "@/custom-components/admin/ProfitBox";

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
      <ProfitBox
        header="Monthly Net Profit"
        desc="Total profit gained"
        rate="+4.33%"
        amount={900000}
      />
      <ProfitBox
        header="Revenue per visitor"
        desc="Average income per visitors in your website"
        rate="-1.03%"
        amount={900000}
      />
    </div>
  );
}
