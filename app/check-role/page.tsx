// app/check-role/page.tsx
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyncLoader } from "react-spinners";

export default function CheckRolePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const role = session?.user?.role;

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
    <p className="text-center mt-10 text-gray-500">
      <SyncLoader
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </p>
  );
}
