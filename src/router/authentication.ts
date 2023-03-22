import express from 'express';
import { register } from '../controllers/authentication';

//It will take in the application router as a parameter
export default (router: express.Router) => {
    router.post('/auth/register', register);
}