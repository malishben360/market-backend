import express from 'express';
import { merge, get, set } from 'lodash';
import { getUserBySessionToken } from '../models/user';

export const isOwner = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const currentUserId = get(req, 'identity._id') as string;
        const { id } = req.params;

        //Check if identity is set
        if (!currentUserId) {
            return res.sendStatus(403);
        }

        //Check if is thesame user
        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }

        return next();

    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

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
            return res.sendStatus(403);
        }

        //Add the user to the request object for verification
        merge(req, { identity: existingUser});
        return next();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}