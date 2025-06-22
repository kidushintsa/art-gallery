//

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/client";

export const authOptions: NextAuthOptions = {
  // The adapter will handle saving users, accounts, and sessions to the DB.
  // It automatically sets the session strategy to "database".
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account", // ✅ Forces account picker
        },
      },
    }),
  ],
  session: { strategy: "jwt" },

  // UN-COMMENT THIS BLOCK
  callbacks: {
    // The session callback is called whenever a session is checked.
    // With a database strategy, the `user` object is the user from your database.
    async session({ session, user }) {
      if (session.user) {
        // 1. Add the user's database ID to the session object
        session.user.id = user.id;

        // 2. (Optional but you need it) Query for your custom `userInfo` and add the role
        // This assumes you have a separate `UserInfo` model linked to the `User` model.
        const userInfo = await prisma.userInfo.findUnique({
          where: { userId: user.id },
        });

        // Add the role to the session. Default to null or a guest role if not found.
        session.user.role = userInfo?.role ?? null;
      }
      return session;
    },

    // This callback is very useful. It runs after a successful sign-in.
    // It will send the user to the `/check-role` page to handle logic
    // after they have been authenticated.
    redirect({ baseUrl }) {
      return `${baseUrl}/check-role`;
    },
  },

  // It's good practice to enable debug logs in development
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
