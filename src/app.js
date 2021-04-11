import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import 'express-async-errors';
import routes from './routes.js';
import cors from 'cors';

const app = express();

app.use(cors());



app.use(express.json());

app.use(routes);

export { app };
