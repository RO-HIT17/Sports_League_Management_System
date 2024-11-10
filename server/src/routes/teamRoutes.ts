import { Router } from 'express';
import { getTeamIdByUserId, addPlayer } from '../controllers/teamController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/getTeam',authenticateJWT, getTeamIdByUserId);
router.post('/addPlayer',authenticateJWT, addPlayer);

export default router;