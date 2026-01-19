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
        }).select(
          "+password name role profileImage termsAccepted profileCompleted"
        );

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
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role as "admin" | "user",
          image: user.profileImage || undefined,
          termsAccepted: user.termsAccepted,
          profileCompleted: user.profileCompleted,
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
        token.role = user.role as "admin" | "user";
        token.image = user.image ?? undefined;

        // 🔥 FIX: normalize null → undefined
        token.name = user.name ?? undefined;

        token.termsAccepted = user.termsAccepted;
        token.profileCompleted = user.profileCompleted;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "admin" | "user";
        session.user.image = token.image ?? undefined;

        // 🔥 FIX: normalize null → undefined
        session.user.name = token.name ?? undefined;

        session.user.termsAccepted =
          token.termsAccepted ?? false;
        session.user.profileCompleted =
          token.profileCompleted ?? false;
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
