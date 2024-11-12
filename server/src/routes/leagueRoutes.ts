import { Router } from 'express';
import { getPendingTeams, updateStatus } from '../controllers/leagueController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.get('/getPendingTeams',authenticateJWT, getPendingTeams);
router.put('/updateStatus',authenticateJWT, updateStatus);
export default router;