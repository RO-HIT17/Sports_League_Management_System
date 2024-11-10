import { Request, Response } from 'express';
import { query } from '../config/db';

export const getPlayerByUserId = async (req: Request, res: Response) : Promise<void> => {
    const { user_id } = req.body;
    if (!user_id) {
      res.status(400).json({ error: 'user_id is required.' });
      return;
    }
  
    try {

        const userResult = await query('SELECT * FROM users WHERE user_id = $1', [user_id]);
  
        if (userResult.rowCount === 0) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }
        const joinQuery = `
        SELECT 
          players.player_id,
          players.player_name,
          players.position,
          players.age,
          users.username,
          users.email
        FROM 
          players
        INNER JOIN 
          users 
        ON 
          players.user_id = users.user_id
        WHERE 
          users.user_id = $1
      `;
      const playersResult = await query(joinQuery, [user_id]);
  
      if (playersResult.rowCount === 0) {
        res.status(200).json({ message: 'No players found for this user.', data: [] });
        return;
      }
  
      res.status(200).json({ data: playersResult.rows });
      return;
    } catch (error) {
      console.error('Error fetching player data:', error);
      res.status(500).json({ error: 'Internal server error.' });
      return;
    }
  }; 