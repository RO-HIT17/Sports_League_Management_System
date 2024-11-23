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
    const { league_id } = req.body;

    const result = await query(`
      SELECT 
        t1.team_name || ' vs ' || t2.team_name || ' ' ||
        TO_CHAR(m.match_date, 'DD/MM/YYYY') || ' ' ||
        TO_CHAR(m.match_date, 'HH24:MI') AS match,
        m.match_id
      FROM 
        matches m
      JOIN 
        teams t1 ON m.home_team_id = t1.team_id
      JOIN 
        teams t2 ON m.away_team_id = t2.team_id
      WHERE 
        m.league_id = $1 
        AND NOT EXISTS (
          SELECT 1 
          FROM results r 
          WHERE r.match_id = m.match_id
        );
    `, [league_id]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const updateResult = async (req: Request, res: Response): Promise<void> => {
  const { league_id,match_id, home_team_score, away_team_score } = req.body;
  try {
    const result = await query('INSERT INTO Results (home_team_score,away_team_score,match_id,league_id) VALUES ($1,$2,$3,$4) RETURNING *', [home_team_score, away_team_score, match_id, league_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating result:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
};

export const getStandings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { league_id } = req.body;
    const result = await query(`
    SELECT * 
      FROM standings_view
      WHERE league_id = $1;`, [league_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching standings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUpcomingMatches = async (req: Request, res: Response): Promise<void> => {
  try {
    const { league_id } = req.body;

    const result = await query(`
      SELECT 
        home_team.team_name AS home_team,
        away_team.team_name AS away_team,
        m.match_date,
        m.match_id,
        m.location
      FROM 
        Matches m
      JOIN 
        Teams home_team ON m.home_team_id = home_team.team_id
      JOIN 
        Teams away_team ON m.away_team_id = away_team.team_id
      WHERE 
        m.league_id = $1 AND m.match_date > CURRENT_DATE
      ORDER BY 
        m.match_date ASC;
    `, [league_id]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getResultsByLeagueId = async (req: Request, res: Response): Promise<void> => {
  const { league_id } = req.body;

  try {
    const result = await query(
      `SELECT 
        t1.team_name AS home_team,
        t2.team_name AS away_team,
        r.home_team_score || ' - ' || r.away_team_score AS scoreline,
        CASE 
          WHEN r.home_team_score > r.away_team_score THEN t1.team_name || ' won'
          WHEN r.home_team_score < r.away_team_score THEN t2.team_name || ' won'
          ELSE 'Draw'
        END AS result,
        r.created_at AS result_created_at
      FROM 
        Results r
      JOIN 
        Matches m ON r.match_id = m.match_id
      JOIN 
        Teams t1 ON m.home_team_id = t1.team_id
      JOIN 
        Teams t2 ON m.away_team_id = t2.team_id
      WHERE 
        m.league_id = $1;`, [league_id]);
      res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}