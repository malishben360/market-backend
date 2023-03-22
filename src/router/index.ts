import express from 'express';
import authentication from './authentication';

//Create application router
const router = express.Router();

export default (): express.Router => {
    authentication(router);
    return router;
}