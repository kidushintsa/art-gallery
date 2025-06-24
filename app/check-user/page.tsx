"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";

export default function CheckUserPage() {
  const { status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    const checkUser = async () => {
      try {
        const res = await fetch("/api/check-user", { cache: "no-store" });

        if (!res.ok) {
          const { error } = await res.json();
          setError(error ?? "Unknown error");
        } else {
          const { user } = await res.json();
          console.log("User confirmed:", user);
          router.replace("/check-role");
        }
      } catch (err) {
        setError("Something went wrong.");
        console.error(err);
      }
    };

    checkUser();
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="grid h-screen place-items-center text-gray-500">
        <MoonLoader size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid h-screen place-items-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return null; // Or spinner while useEffect runs
}
