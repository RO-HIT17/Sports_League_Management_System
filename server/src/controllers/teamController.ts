import { Request, Response } from 'express';
import { query } from '../config/db';


export const getTeamIdByUserId = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = req.body;

  try {
    const result = await query('SELECT team_id FROM Teams WHERE created_by = $1', [user_id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching team ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const createTeam = async (req: Request, res: Response): Promise<void> => {
  const { team_name, coach_name, created_by, league_id, status } = req.body;

  try {
    const result = await query(
      'INSERT INTO Teams (team_name, coach_name, created_by, league_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [team_name, coach_name, created_by, league_id, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query('SELECT * FROM Teams');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getTeamById = async (req: Request, res: Response): Promise<void> => {
  const { team_id } = req.params;

  try {
    const result = await query('SELECT * FROM Teams WHERE team_id = $1', [team_id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const updateTeam = async (req: Request, res: Response): Promise<void> => {
  const { team_id } = req.params;
  const { team_name, coach_name, league_id, status } = req.body;

  try {
    const result = await query(
      'UPDATE Teams SET team_name = $1, coach_name = $2, league_id = $3, status = $4 WHERE team_id = $5 RETURNING *',
      [team_name, coach_name, league_id, status, team_id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const deleteTeam = async (req: Request, res: Response): Promise<void> => {
  const { team_id } = req.params;

  try {
    const result = await query('DELETE FROM Teams WHERE team_id = $1 RETURNING *', [team_id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};