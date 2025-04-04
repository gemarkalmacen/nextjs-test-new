import { getDjangoApiHost } from "@/functions/env";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // Make API call to validate user credentials
          const response = await axios.post(
            `${getDjangoApiHost()}/api/account/auth/login/`,
            {
              username: credentials.username,
              password: credentials.password,
            }
          );

          // Check if the response has a valid user object
          const user = response.data; // Assuming the API returns user data
          console.log("USERCRE", user);

          if (user && user.data) {
            // Extract login data and profile data
            const loginData = user.data.user.login; // Assuming this is where the token is stored
            const profileData = user.data.profile.basic_information; // Assuming the profile information is here

            // If login and profile data are available, return the user object
            return {
              ...user.data.user, 
              login: loginData,   
              profile: profileData, 
            };
          } else {
            return null;
          }
        } catch (error) {
            console.error("Error authenticating user:", error);
            return null; 
          }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      // if (user) {
      //     token.user = user;
      //     token.profile = user.profile;
      //     token.accessToken = user.token;
      // }
      if (user) {
        return {
            ...token,
            username: user.username,
            accessToken: user.accessToken, // Storing the login token from the API response
            profile: user.profile,
        };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // if (token) {
      //     session.user = token.user;
      //     session.profile = token.profile;
      //     session.accessToken = token.accessToken;
      // }

      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,  // Adding username to session user object
          profile: token.profile,    // Adding profile to session user object
          accessToken: token.accessToken, // Adding the access token to session
        },
      };
    },
  },
};

// try {
//     const res = await fetch(`https://devapi.surigaocity.gov.ph/api/account/auth/login/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             username: credentials.username,
//             password: credentials.password,
//         }),
//     });

//     const user = await res.json();
//     if (!res.ok) {
//         throw new Error(`API responded with status ${res.status}`);
//     }

//     return {
//         ...user.data.user,
//         token: user.data.user.login.token,
//         profile: user.data.profile,
//     };
// } catch (error) {
//     console.error("Error during authorization:", error);
//     throw new Error("Authorization failed. Please try again.");
// }
