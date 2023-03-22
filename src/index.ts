import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

//Express instance 
const app = express();

//Inject addon dependencies

//Cors for authentication purpose
app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//Create server for http request and response
const server = http.createServer(app);
server.listen(9000, () => console.log('Server listening at 9000'));

//mongoDB URL: move it to .env file later
const MONGODB_URL = 'mongodb+srv://malishben360:malishben360@cluster0.nykh3xo.mongodb.net/?retryWrites=true&w=majority';

//mongoose connection
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));
