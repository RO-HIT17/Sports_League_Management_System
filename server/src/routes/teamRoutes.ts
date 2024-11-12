import { Router } from 'express';
import { getTeamIdByUserId, registerInLeague, addPlayer, getPLayers, removePlayer, updatePlayer, getLeagues } from '../controllers/teamController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/getTeam',authenticateJWT, getTeamIdByUserId);
router.post('/addPlayer',authenticateJWT, addPlayer);
router.post('/getPlayers',authenticateJWT, getPLayers);
router.put('/updatePlayer',authenticateJWT, updatePlayer);
router.delete('/deletePlayer',authenticateJWT, removePlayer);
router.get('/getLeagues',authenticateJWT, getLeagues);
router.put('/registerInLeague',authenticateJWT, registerInLeague);

export default router;