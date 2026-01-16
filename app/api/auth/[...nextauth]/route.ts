import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

/**
 * ✅ Export authOptions
 * This is REQUIRED for getServerSession (Admin Dashboard, etc.)
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        await connectDB();

        const user = await User.findOne({
          email: credentials.email,
        }).select("+password profileImage name role isActive");

        if (!user) {
          throw new Error("User not found");
        }

        // 🚫 Block suspended users
        if (user.isActive === false) {
          throw new Error("Account suspended");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.profileImage,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = (user as any).name;
        token.role = (user as any).role;
        token.image = (user as any).image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * ✅ NextAuth handler
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
