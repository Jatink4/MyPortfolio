import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes.js';
import codechefRoute from './routes/codechefRoute.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/projects', projectRoutes);
app.use('/api/codechef', codechefRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
