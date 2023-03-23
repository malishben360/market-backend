import express from 'express';
import { authentication, random } from '../helpers';
import { createUser, getUserByEmail } from '../models/user';

export const login = async(req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        //Check if payload contains email and password
        if (!email || !password) {
            return res.sendStatus(403);
        }

        //Important to select salt and password as they aren't selected by default in the user model
        const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");

        //Check if user exist
        if (!user){
            return res.sendStatus(404);
        }

        //Authenticate the user using password hashing
        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        //Update user sessionToken
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        user.save()
        
        //Set session cookie
        res.cookie('MALISH-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json(user).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async(req: express.Request, res: express.Response) => {
    try {
        const { username, email, password } = req.body;

        //Check if any of the payload attribute is empty
        if(!username || !email || !password) {
            return res.sendStatus(400);
        }

        //Check if the user already exist
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                salt: salt,
                password: authentication(salt, password)
            }
        });
        
        //Return created user on success
        return res.status(201).json(user).end();
    
    } catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}