import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialProviders from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
// import { prisma } from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/client";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // CredentialProviders({
    //   name: "Credentials",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "myemail@gmail.com",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     console.log("Credentials received", credentials);

    //     if (!credentials?.email || !credentials.password) {
    //       console.log("Missing credentials");
    //       return null;
    //     }

    //     const user = await prisma.user.findUnique({
    //       where: { email: credentials.email },
    //     });

    //     if (!user) {
    //       console.log("No user found");
    //       return null; // return ;
    //     }

    //     const passwordsMatch = await bcrypt.compare(
    //       credentials.password,
    //       user.hashedPassword
    //     );

    //     console.log("Password match:", passwordsMatch);

    //     if (!passwordsMatch) {
    //       return null;
    //     }

    //     return { ...user, id: user.id.toString() };
    //   },
    // }),
  ],
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/", // your custom login page
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      // Only redirect after sign-in, not after sign-out
      if (url === baseUrl || url === baseUrl + "/") {
        return baseUrl + "/check-role"; // login redirect
      }
      return url;
    },
    // async jwt({ token, user }) {
    //   if (user) {
    //     // First time user signs in
    //     const dbUser = await prisma.user.findUnique({
    //       where: { email: user.email! },
    //     });

    //     token.role = (dbUser?.role as string) ?? null;
    //   }

    //   return token;
    // },
    // async session({ session, token }) {
    //   if (session.user) {
    //     session.user.role = token.role as string;
    //   }
    //   return session;
    // },
    async session({ session, user }) {
      // ✅ Now `user.role` comes from DB automatically
      if (session.user && user) {
        session.user.role = user.role;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
