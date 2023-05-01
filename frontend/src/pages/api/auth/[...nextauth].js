import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const { username, password } = credentials;

                const res = await fetch("http://localhost:5000/auth/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: username,
                        password,
                    }),
                });

                const user = await res.json();
                if (res.ok && user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signin",
    },
    callbacks: {
        async jwt({ token, user }) {

         /*    console.log("callbacks jwt token", token)
            console.log("callbacks jwt account", user) */
            return {...token, ...user}
            
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user = token;
          /*   console.log("callbacks session session", session)
            console.log("callbacks session token", token)
            console.log("callbacks session user", user) */
            return session;
        },
    },
};

export default NextAuth(authOptions);
