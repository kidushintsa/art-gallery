//

import { prisma } from "@/prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { prompt: "select_account" } },
    }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        // If not, create user manually
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name || "",
              image: profile.image || "",
            },
          });
          console.log("✅ New user created in DB:", profile.email);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
      }
      return session;
    },
    // watch this code below redirect this might affect how the signin or signout works
    redirect({ baseUrl }) {
      return `${baseUrl}/check-role`; // only used for sign-in
    },
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
