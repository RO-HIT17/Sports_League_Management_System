import { Router } from 'express';
import { getTeamIdByUserId } from '../controllers/teamController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/getTeam',authenticateJWT, getTeamIdByUserId);

export default router;