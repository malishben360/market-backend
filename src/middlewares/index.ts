import express from 'express';
import { merge, get } from 'lodash';
import { getUserBySessionToken } from '../models/user';

export const isAuthenticated = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        //Move the cookies key to .env file later
        const sessionToken = req.cookies['MALISH-AUTH'];

        //Check if it has active session
        if (!sessionToken) {
            return res.sendStatus(403);
        }

        //Get user by session token
        const existingUser = await getUserBySessionToken(sessionToken);

        //Check if user exist
        if (!existingUser) {
            return res.sendStatus(404);
        }

        merge(req, { identity: existingUser });
        return next();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}