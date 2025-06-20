// app/check-role/page.tsx
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";

export default function CheckRolePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const role = session?.user?.role;
      console.log(role);
      if (role === "ARTIST") {
        router.replace("/dashboard/artist");
      } else if (role === "CUSTOMER") {
        router.replace("/dashboard/customer");
      } else {
        router.replace("/role-selection");
      }
    }
  }, [status, session, router]);

  return (
    <div className="text-center mt-10 text-gray-500 grid h-screen place-items-center">
      <MoonLoader size={60} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
}
