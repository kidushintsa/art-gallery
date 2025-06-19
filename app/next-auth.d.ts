import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // ✅ Add this line
      // id?: string;   // ✅ If you also need `user.id`
    };
  }

  interface User {
    role?: string; // from database
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
