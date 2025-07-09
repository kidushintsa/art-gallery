"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CheckRolePage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      if (status === "unauthenticated") return router.push("/");

      try {
        const res = await fetch("/api/user-role", { cache: "no-store" });
        const data = await res.json();

        if (res.ok && data.role) {
          if (data.role === "ARTIST") {
            router.replace("/dashboard/artist");
          } else if (data.role === "CUSTOMER") {
            router.replace("/dashboard/user");
          } else if (data.role === "ADMIN") {
            router.replace("/admin");
          } else {
            router.replace("/role-selection");
          }
        } else {
          router.replace("/role-selection");
        }
      } catch (error) {
        console.error("Error checking role:", error);
        router.replace("/role-selection");
      }
    };

    checkRole();
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="grid h-screen place-items-center text-gray-500">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return null;
}
