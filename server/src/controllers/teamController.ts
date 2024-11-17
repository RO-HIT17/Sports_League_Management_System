import { Request, Response } from 'express';
import { query } from '../config/db';
import { TeamType, FootballPosition, CricketPosition } from '../types/enum';

export const getTeamIdByUserId = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = req.body;

  try {
    const result = await query('SELECT team_id, team_type FROM Teams WHERE created_by = $1', [user_id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }

    const { team_id, team_type } = result.rows[0];
    let positionsEnum: FootballPosition[] | CricketPosition[];

    switch (team_type) {
      case TeamType.Football:
        positionsEnum = Object.values(FootballPosition);
        break;
      case TeamType.Cricket:
        positionsEnum = Object.values(CricketPosition);
        break;
      default:
        positionsEnum = [];
        break;
    }

    res.status(200).json({ team_id, team_type, positions: positionsEnum });
  } catch (error) {
    console.error('Error fetching team ID and type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addPlayer = async (req: Request, res: Response): Promise<void> => {
    const { player_name, team_id, position, age,user_id } = req.body;
  
    try {
      
      const result = await query(
        'INSERT INTO Players (player_name, team_id, position, age, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [player_name, team_id, position, age, user_id]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding player:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export const getPLayers = async (req: Request, res: Response): Promise<void> => {
    const { team_id } = req.body;
  
    try {
      const result = await query('SELECT * FROM Players WHERE team_id = $1', [team_id]);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching players:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export const updatePlayer = async (req: Request, res: Response): Promise<void> => {
    const { player_id, player_name, position, age } = req.body;
  
    try {
      const result = await query(
        'UPDATE Players SET player_name = $1, position = $2, age = $3 WHERE player_id = $4 RETURNING *',
        [player_name, position, age, player_id]
      );
  
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Player not found' });
        return;
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating player:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  export const removePlayer = async (req: Request, res: Response): Promise<void> => {
    const { player_id } = req.body;
  
    try {
      const result = await query('DELETE FROM Players WHERE player_id = $1 RETURNING *', [player_id]);
  
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Player not found' });
        return;
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error removing player:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

export const getLeagues = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query('SELECT * FROM Leagues');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching leagues:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const registerInLeague = async (req: Request, res: Response): Promise<void> => {
  const { team_id, league_id } = req.body;

  try {
    const result = await query(
      'UPDATE Teams SET league_id = $2, status = $3 WHERE team_id = $1 RETURNING *',
      [team_id, league_id, 'pending']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error registering team in league:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUpcomingMatches = async (req: Request, res: Response): Promise<void> => {
  const { team_id } = req.body;

  try {
    const result = await query(
      `SELECT 
        TO_CHAR(m.match_date, 'DD/MM/YYYY') AS match_date,
        TO_CHAR(m.match_date, 'HH24:MI') AS match_time,
        CASE 
          WHEN m.home_team_id = $1 THEN at.team_name
          ELSE ht.team_name
        END AS opponent,
        m.location,
        CASE 
          WHEN m.home_team_id = $1 THEN 'Home'
          ELSE 'Away'
        END AS match_type
      FROM 
        Matches m
      INNER JOIN 
        Teams ht ON m.home_team_id = ht.team_id
      INNER JOIN 
        Teams at ON m.away_team_id = at.team_id
      WHERE 
        (m.home_team_id = $1 OR m.away_team_id = $1)
        AND m.match_date > CURRENT_DATE;`,
      [team_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching upcomming matches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPastMatches = async (req: Request, res: Response): Promise<void> => {
  const { team_id } = req.body;

  try {
    const result = await query(
      `SELECT 
    m.match_id,
    m.match_date,
    m.home_team_id,
    m.away_team_id,
    m.location,
    r.home_team_score,
    r.away_team_score,
    FROM 
        Matches m
    NATURAL JOIN 
        Results r
    WHERE 
        (m.home_team_id = $1 OR m.away_team_id = $1)
        AND m.match_date < CURRENT_DATE
    `,
      [team_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching past matches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
