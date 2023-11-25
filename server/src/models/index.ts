import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/';
const DB_NAME = process.env.DATABASE_NAME || 'collabor8';

const client = mongoose;

client.connect(`${DB_URL}${DB_NAME}`)
  .then(() => console.log(`Collabor8 DB running`))
  .catch((err) => console.log(`Error connecting to mongoDB: ${err}`));

export default client;
