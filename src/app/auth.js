import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import DBConnection from "./utils/config/db";
import UserModel from "./utils/models/User";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    Credentials({
      name: "credentials",

      async authorize(credentials) {
        await DBConnection();

        const user = await UserModel.findOne({ email: credentials?.email });
        console.log("user:", user);
        if (!user) {
          return null;
        }
        if (user.password !== credentials?.password) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.username = user.name;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.userId = token.userId;
        session.username = token.username;
        session.role = token.role;
        session.email = token.email;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
});
