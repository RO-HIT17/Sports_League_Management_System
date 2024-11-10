import { Router } from 'express';
import { getPlayerByUserId,getPlayersByTeamId, getTeam } from '../controllers/playerController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/getPlayer',authenticateJWT, getPlayerByUserId);
router.post('/getPlayersByTeamId',authenticateJWT, getPlayersByTeamId);
router.post('/getTeam',authenticateJWT, getTeam);

export default router;