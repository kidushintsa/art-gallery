import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the user's ID
      role: string | null; // Add the user's role
    } & DefaultSession["user"];
  }

  // If you are using the database strategy, you might want to add role to the User model as well
  interface User {
    role?: string | null;
  }
}
