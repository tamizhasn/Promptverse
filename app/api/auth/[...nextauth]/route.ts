import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
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
        }).select("+password name role profileImage");

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(), // 🔑 REQUIRED
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.profileImage,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt", 
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.image = user.image;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = token.image ?? undefined;
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
