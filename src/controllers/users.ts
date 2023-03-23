import express from 'express';
import { getUsers, deleteUserById, getUserById } from '../models/user';

export const getAllUsers = async(req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        if (!deletedUser) {
            return res.sendStatus(404);
        }

        return res.status(200).json(deletedUser).end();

    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

//Only username can be updated for now
export const updateUser = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        //Check if id exist
        if (!id) {
            return res.sendStatus(400)
        }
        
        const updatedUser = await getUserById(id);

        //Check if user exist
        if (!updatedUser) {
            return res.sendStatus(404);
        }

        updatedUser.username = username;
        updatedUser.save();

        return res.status(200).json(updatedUser).end();

    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}