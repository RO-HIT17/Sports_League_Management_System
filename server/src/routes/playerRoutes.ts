import { Router } from 'express';
import { getPlayerByUserId, getMatchesByUserId,getRecentMatches,getPlayerTeamInfo,getPlayersByTeamId, getTeam } from '../controllers/playerController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/getPlayer',authenticateJWT, getPlayerByUserId);
router.post('/getPlayersByTeamId',authenticateJWT, getPlayersByTeamId);
router.post('/getTeam',authenticateJWT, getTeam);
router.post('/getMatchesByUserId',authenticateJWT, getMatchesByUserId);
router.post('/getPlayerTeamInfo',authenticateJWT, getPlayerTeamInfo);
router.post('/getRecentMatches',authenticateJWT, getRecentMatches);

export default router;