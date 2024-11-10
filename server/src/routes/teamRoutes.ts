import { Router } from 'express';
import { getTeamIdByUserId, addPlayer, getPLayers } from '../controllers/teamController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/getTeam',authenticateJWT, getTeamIdByUserId);
router.post('/addPlayer',authenticateJWT, addPlayer);
router.post('/getPlayers',authenticateJWT, getPLayers);
export default router;