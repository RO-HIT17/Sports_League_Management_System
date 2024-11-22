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
export const getLeagueByCreatedBy = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.body;
    
    try {
        const result = await query('SELECT * FROM Leagues WHERE created_by = $1', [user_id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching leagues:', error);
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

export const getApprovedTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query('SELECT * FROM Teams WHERE status = $1', ['approved']);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching approved teams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateLeagueInfo = async (req: Request, res: Response): Promise<void> => {
  const { league_id, league_name, sport_type } = req.body;

  try {
    await query('UPDATE Leagues SET league_name = $1, sport_type = $2 WHERE league_id = $3', [league_name, sport_type, league_id]);
    res.status(204).end();
  } catch (error) {
    console.error('Error updating league info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLeagueById = async (req: Request, res: Response): Promise<void> => {
  const { league_id } = req.body;

  try {
    const result = await query('SELECT * FROM Leagues WHERE league_id = $1', [league_id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching league:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const scheduleMatch = async (req: Request, res: Response): Promise<void> => {
  const { league_id, home_team, away_team, match_date, location } = req.body;

  try {
    await query('INSERT INTO Schedules (league_id, home_team, away_team, match_date, location) VALUES ($1, $2, $3, $4, $5)', [league_id, home_team, away_team, match_date, location]);
    res.status(201).end();
  } catch (error) {
    console.error('Error scheduling match:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTeamsByLeagueId = async (req: Request, res: Response): Promise<void> => {
  const { league_id } = req.body;

  try {
    const result = await query('SELECT * FROM Teams WHERE league_id = $1', [league_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addMatches = async (req: Request, res: Response): Promise<void> => {
  const { home_team_id , away_team_id ,match_date ,location , league_id } = req.body;

  try {
    const result = await query('INSERT INTO Matches (home_team_id, away_team_id, match_date, location, league_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [home_team_id, away_team_id, match_date, location, league_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding matches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMatchesByLeagueId = async (req: Request, res: Response): Promise<void> => {
  const { league_id } = req.body;

  try {
    const result = await query('SELECT * FROM Matches WHERE league_id = $1', [league_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const automaticScheduling = async (req: Request, res: Response): Promise<void> => {
  const { league_id } = req.body;

  try {
    await query('CALL generate_schedule($1)', [league_id]);
    const teams = await query('SELECT * FROM Matches WHERE league_id = $1', [league_id]);
    res.status(200).json(teams.rows);
  } catch (error) {
    console.error('Error automatic scheduling:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const matchesList = async (req: Request, res: Response): Promise<void> => {
  try {
    const {league_id} = req.body;
    const result = await query(`
  SELECT 
  (SELECT team_name FROM teams WHERE team_id = m.home_team_id) || ' vs ' || 
  (SELECT team_name FROM teams WHERE team_id = m.away_team_id) || ' ' ||
  TO_CHAR(m.match_date, 'DD/MM/YYYY') || ' ' ||
  TO_CHAR(m.match_date, 'HH24:MI') AS match,
  m.match_id
FROM 
  matches m
WHERE 
  m.league_id = $1;
  `, [league_id]);
  
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateResult = async (req: Request, res: Response): Promise<void> => {
  const { match_id, home_team_score, away_team_score } = req.body;
  try {
    const result = await query('INSERT INTO Results (home_team_score,away_team_score,match_id) VALUES ($1,$2,$3) RETURNING *', [home_team_score, away_team_score, match_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating result:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
};