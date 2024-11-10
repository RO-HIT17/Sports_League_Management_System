import { Router } from 'express';
import { getTeamIdByUserId, addPlayer, getPLayers, removePlayer, updatePlayer } from '../controllers/teamController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/getTeam',authenticateJWT, getTeamIdByUserId);
router.post('/addPlayer',authenticateJWT, addPlayer);
router.post('/getPlayers',authenticateJWT, getPLayers);
router.put('/updatePlayer',authenticateJWT, updatePlayer);
router.delete('/deletePlayer',authenticateJWT, removePlayer);

export default router;