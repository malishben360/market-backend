import express from 'express';
import { register, login } from '../controllers/authentication';

//It will take in the application router as a parameter
export default (router: express.Router) => {
    router.post('/auth/login', login);
    router.post('/auth/register', register);
}