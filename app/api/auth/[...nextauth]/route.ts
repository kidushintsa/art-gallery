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
    strategy: "jwt",
  },
  pages: {
    signIn: "/", // your custom login page
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + "/check-role"; // go to a custom role check route
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
