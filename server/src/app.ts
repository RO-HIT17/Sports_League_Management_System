import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import teamRoutes from './routes/teamRoutes';
import playerRoutes from './routes/playerRoutes';
import leagueRoutes from './routes/leagueRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/slms/team', teamRoutes);
app.use('/slms/user', userRoutes);
app.use('/slms/player', playerRoutes);
app.use('/slms/league', leagueRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});