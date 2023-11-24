import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { error } from 'console';

// import router from './router';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SECRET = process.env.SECRET || 'secret';

const corsConfig = {
  credentials: true,
  origin: true
}

const app = express();

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
// app.use(router);

const server = app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});

server.on('error', (error) => {
  console.log('Server error: ', error);
});


