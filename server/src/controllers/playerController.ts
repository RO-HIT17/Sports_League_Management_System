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
          players.team_id,
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


  export const getPlayersByTeamId = async (req: Request, res: Response): Promise<void> => {
    const { team_id } = req.body;
  
    try {
      const stmt = `
        SELECT 
        players.player_id, 
        players.player_name, 
        players.position, 
        players.age, 
        teams.team_name,
        teams.coach_name,
        teams.team_id,
        teams.created_by,
        teams.team_type
        FROM players JOIN teams 
        ON players.team_id = teams.team_id
        WHERE players.team_id = $1
      `;
      const values = [team_id];
  
      const result = await query(stmt, values);
  
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'No players found for the given team ID.' });
        return;
      }
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching players by team ID:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

export const getTeam = async (req: Request, res: Response): Promise<void> => {
    const { team_id } = req.body;
  
    try {
      const stmt = `
        SELECT 
          team_id, 
          team_name, 
          coach_name, 
          team_type
        FROM 
          teams 
        WHERE 
          team_id = $1
      `;
      const values = [team_id];
  
      const result = await query(stmt, values);
  
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'No team found for the given user ID.' });
        return;
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching team:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }