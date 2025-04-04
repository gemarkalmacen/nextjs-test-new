// import NextAuth from "next-auth"

// declare module "next-auth" {
//     interface User {
//         username: string,
//     }
//   interface Session {
//     user: User &{
//         username: string
//     }
//     token: {
//         username: string
//     }
//   }
// }

// next-auth.d.ts
import NextAuth from "next-auth";

// Extend the NextAuth.js types
declare module "next-auth" {
  // Define the User object
  interface User {
    username: string; // Add any additional properties you need
    profile?: Record<string, any>; // Optionally add profile or other fields
    accessToken?: string; // Optionally add profile or other fields
    // Add any other properties the user object might have
  }

  // Define the Session object
  interface Session {
    user: User & {
      username: string; // Ensure `username` is available on the session user
      profile?: Record<string, any>; // Optionally include profile
    };
    token: {
      username: string; // Ensure `username` is available on the token
      accessToken: string; // Optionally include access token
    };
  }

  // Optionally, extend JWT if you're using custom JWT fields
  interface JWT {
    username: string; // Add username to the JWT token if you're storing it there
    accessToken: string; // If you're storing an access token in JWT
  }
}
