import { Request, Response } from 'express';
import { query } from '../config/db';

export const updateStatus = async (req: Request, res: Response): Promise<void> => {
  const { team_id, status } = req.body;

  try {
    await query('UPDATE Teams SET status = $1 WHERE team_id = $2', [status, team_id]);
    res.status(204).end();
  } catch (error) {
    console.error('Error updating match status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPendingTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query('SELECT * FROM Teams WHERE status = $1', ['pending']);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching pending teams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};