import express from 'express';
import { authentication, random } from 'helpers';
import { createUser, getUserByEmail } from 'models/user';

export const register = async(req: express.Request, res: express.Response) => {
    try {
        const { username, email, password } = req.body;

        //check if any of the payload attribute is empty
        if(!username || !email || !password) {
            return res.sendStatus(400);
        }

        //check if the user already exist
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

        return res.status(200).json(user).end();
    } catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}