import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    // this all are callBacks function it should wrap inside the call back object as per the documentation..
    async session({ session }) {
      // store the user id from MongoDB to session
      // it find the user based on it's email in mongoDb data base and store the all user data in sessionUser variable..
      // after it add the particular user id(sessionUser._id) to "session.user.id" and return the session...
      // this session contain the this added user id along with the other data which has email,username and image(for my case..)
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
        // sign in accept above props(account,profile,user...etc)...
      try {
        await connectToDB(); // we connect to the db by calling this function...

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });
        // check if the user is exist or not based on finding by it's email..

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(), // if space is there remove it b replacing it with ""
            image: profile.picture, // save the user picture of it's account
          });
        }
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }