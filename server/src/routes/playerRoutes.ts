import { Router } from 'express';
import { getPlayerByUserId } from '../controllers/playerController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/getPlayer',authenticateJWT, getPlayerByUserId);

export default router;