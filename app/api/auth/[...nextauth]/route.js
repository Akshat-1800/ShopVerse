import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import dbConnect from "@/lib/db";
import User from "@/models/User";

export const authOptions = {
  // 🔐 Session strategy
  session: {
    strategy: "jwt",
  },

  // 🔑 Authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      // Fields expected from frontend
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }, // customer / seller
      },

      // 🧠 CORE LOGIN LOGIC
      async authorize(credentials) {
        // 1️⃣ Connect DB
        await dbConnect();

        // 2️⃣ Validate input
        if (!credentials?.email || !credentials?.password || !credentials?.role) {
          throw new Error("Invalid credentials");
        }

        // 3️⃣ Find user
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        // 4️⃣ Check role matches
        if (user.role !== credentials.role) {
          throw new Error("Unauthorized role");
        }

        // 5️⃣ Compare password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // 6️⃣ Return SAFE user object
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // 🔑 Runs when JWT is created/updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
    
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };