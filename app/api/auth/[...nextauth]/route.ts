import { prisma } from "@/prisma/client";
import NextAuth from "next-auth";
import CredentialProviders from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
const handler = NextAuth({
  providers: [
    CredentialProviders({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "myemail@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        console.log("Credentials received", credentials);

        if (!credentials?.email || !credentials.password) {
          console.log("Missing credentials");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log("No user found");
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        console.log("Password match:", passwordsMatch);

        if (!passwordsMatch) {
          return null;
        }

        return { ...user, id: user.id.toString() };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // your custom login page
  },
});

export { handler as GET, handler as POST };
