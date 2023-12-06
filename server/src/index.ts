import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './router';
import { connectDB } from './models/index';
import { connectWS } from './socket';
import { Server } from 'socket.io';

const swaggerJsdoc = require('swagger-jsdoc');

export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'collabor8 API',
      version: '1.0.0',
    },
  },
  apis: ['**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;

const corsConfig = {
  credentials: true,
  origin: true,
};

export const app = express();

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(router);

export const startServer = async () => {
  try {
    await connectDB();
    const SERVER_PORT = process.env.SERVER_PORT || 3001;
    
    app.listen(SERVER_PORT, () => {
      console.log(`Server running on port ${SERVER_PORT}`);
    });
  } catch (err) {
    console.log(`Error connecting to mongoDB: ${err}`);
  }
};

const expressServer = app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});

try {
  connectDB();
} catch (err) {
  console.log(`Error connecting to mongoDB: ${err}`);
}

const io = new Server(expressServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
connectWS(io);
