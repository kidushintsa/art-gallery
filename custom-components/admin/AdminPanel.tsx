import React from "react";
import {
  AppsPanelData,
  HomePanelData,
  MiscPanelData,
  PagesPanelData,
} from "@/data/AdminPanelData";
import AdminNavLink from "./AdminNavLink";
import PanalSectionHeader from "./PanalSectionHeader";
const AdminPanel = () => {
  return (
    <div className="border ps-5 w-[25%] bg-gray-50">
      <header className="p-3">
        <h1 className="text-4xl">
          <span className="text-green-400">ADMIN</span> Panel
        </h1>
      </header>
      <section className="flex flex-col mb-3 border">
        <PanalSectionHeader title="HOMEPAGE" />
        {HomePanelData.map(({ name, href, children }) => (
          <AdminNavLink key={name} name={name} href={href}>
            {children}
          </AdminNavLink>
        ))}
      </section>
      <section className="flex flex-col mb-3">
        <PanalSectionHeader title="APPS" />
        {AppsPanelData.map(({ name, href, children }) => (
          <AdminNavLink key={name} name={name} href={href}>
            {children}
          </AdminNavLink>
        ))}
      </section>
      <section className="flex flex-col mb-3">
        <PanalSectionHeader title="MISC" />
        {PagesPanelData.map(({ name, href, children }) => (
          <AdminNavLink key={name} name={name} href={href}>
            {children}
          </AdminNavLink>
        ))}
      </section>
      <section className="flex flex-col mb-3">
        <PanalSectionHeader title="DOCS" />
        {MiscPanelData.map(({ name, href, children }) => (
          <AdminNavLink key={name} name={name} href={href}>
            {children}
          </AdminNavLink>
        ))}
      </section>
    </div>
  );
};

export default AdminPanel;
