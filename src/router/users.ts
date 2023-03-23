import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import express from 'express';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.patch('/users/:id', isAuthenticated, updateUser);
    router.delete('/users/:id', isAuthenticated, deleteUser);
}