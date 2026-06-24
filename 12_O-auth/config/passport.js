import passport from "passport";

import passportGoogle from "passport-google-oauth20";

import User from "../model/User.js";

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const googleStrategy = passportGoogle.Strategy;

passport.use(
    new googleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/google/redirect",
        },

        async function (accessToken, refreshToken, profile, done) {
            const alreadyUser = await User.findOne({ googleId: profile.id });

            console.log("profile", profile)

            if (!alreadyUser) {
                const newUser = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0]?.value,
                });

                return done(null, newUser);
            }

            return done(null, alreadyUser);
        },
    ),
);


export default passport