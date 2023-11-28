import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './router';
import {connectDB} from './models/index'
const swaggerJsdoc = require("swagger-jsdoc");

export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "collabor8 API",
      version: "1.0.0",
    },
  },
  apis: ["**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
console.log(swaggerSpec);
dotenv.config();


const SERVER_PORT = process.env.SERVER_PORT || 3001;

const corsConfig = {
  credentials: true,
  origin: true
}

const app = express();

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(router);

const startServer = async () => {
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

startServer();
