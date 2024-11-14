import { Router } from 'express';
import { getPendingTeams, updateStatus,getTeamsByLeagueId, getLeagueById, getLeagueByCreatedBy, getApprovedTeams,scheduleMatch, updateLeagueInfo } from '../controllers/leagueController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.get('/getPendingTeams',authenticateJWT, getPendingTeams);
router.get('/getApprovedTeams',authenticateJWT, getApprovedTeams);
router.post('/getLeagueById',authenticateJWT, getLeagueById);
router.put('/updateStatus',authenticateJWT, updateStatus);
router.put('/updateLeagueInfo',authenticateJWT, updateLeagueInfo);
router.post('/getLeagueByCreatedBy',authenticateJWT, getLeagueByCreatedBy);
router.post('/scheduleMatch',authenticateJWT, scheduleMatch);
router.post('/getTeamsByLeagueId',authenticateJWT, getTeamsByLeagueId);
export default router;