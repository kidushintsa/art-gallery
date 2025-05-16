import { AdminNavlink } from "@/entities/adminNavlink";
import Link from "next/link";

const AdminNavLink = ({ name, href, children }: AdminNavlink) => {
  return (
    <Link href={href} className="ms-2">
      <section className="flex items-center">
        <span className="text-zinc-400">{children}</span>
        <span className="p-2">{name}</span>
      </section>
    </Link>
  );
};

export default AdminNavLink;
