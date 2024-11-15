'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';

type Team = {
  team_id: number;
  team_name: string;
  coach_name : string;
  created_at: string;
  created_by: number;
  team_type: string;
  status: string;
  league_id: number;

};

type Match = {
  match_id: string;
  home_team_id: string;
  away_team_id: string;
  match_date: string;
  location: string;
  league_id: string;
};

const MatchScheduling = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [newMatch, setNewMatch] = useState<Partial<Match>>({
    home_team_id: '',
    away_team_id: '',
    match_date: '',
    location: '',
    league_id: '',
  });

  useEffect(() => {
    const league_id = localStorage.getItem('league_id');
    const authToken = localStorage.getItem('authToken');
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:5000/slms/league/getTeamsByLeagueId' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ league_id })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        const data = await response.json();
        console.log(data);
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    
    const fetchMatches = async () => {
      const league_id = localStorage.getItem('league_id');
      const authToken = localStorage.getItem('authToken');

      try {
        const response = await fetch('http://localhost:5000/slms/league/getMatchesByLeagueId' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ league_id })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch matches');
        }
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchTeams();
    fetchMatches();
  }, []);

  const handleScheduleMatch = async () => {
    const league_id = localStorage.getItem('league_id');
    const authToken = localStorage.getItem('authToken');

    const matchData = { ...newMatch, league_id };
    console.log(matchData);
    try {
      const response = await fetch('http://localhost:5000/slms/league/addMatches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(matchData),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule match');
      }

      const data = await response.json();
      setMatches([...matches, data]);
      setNewMatch({
        home_team_id: '',
        away_team_id: '',
        match_date: '',
        location: '',
        league_id: '',
      });

    } catch (error) {
      console.error('Error scheduling match:', error);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Schedule Match</h3>
        </CardHeader>
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <Button onClick={handleScheduleMatch}>Generate Automated Schedule</Button>
          </div>
        </CardBody>
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
              placeholder="Select Home Team"
              value={newMatch.home_team_id}
              onChange={(e) => setNewMatch({ ...newMatch, home_team_id: Number(e.target.value) })}
            >
              {teams.map((team) => (
                <SelectItem
                  isDisabled={team.team_id === newMatch.away_team_id}
                  key={team.team_id}
                  value={team.team_id}
                >
                  {team.team_name}
                </SelectItem>
              ))}
            </Select>
            <Select
              placeholder="Select Away Team"
              value={newMatch.away_team_id}
              onChange={(e) => setNewMatch({ ...newMatch, away_team_id: Number(e.target.value) })}
            >
              {teams.map((team) => (
                <SelectItem
                  isDisabled={team.team_id === newMatch.home_team_id}
                  key={team.team_id}
                  value={team.team_id}
                >
                  {team.team_name}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="datetime-local"
              placeholder="Match Date"
              value={newMatch.match_date}
              onChange={(e) => setNewMatch({ ...newMatch, match_date: e.target.value })}
            />
            <Input
              placeholder="Location"
              value={newMatch.location}
              onChange={(e) => setNewMatch({ ...newMatch, location: e.target.value })}
            />
            <Button onClick={handleScheduleMatch}>Schedule Match</Button>
          </div>
        </CardBody>
      </Card>

      
      <Card>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Match Schedule</h3>
        </CardHeader>
        <CardBody>
          {matches.length > 0 ? (
            <Table
              aria-label="Match Schedule"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Home Team</TableColumn>
                <TableColumn>Away Team</TableColumn>
                <TableColumn>Match Date</TableColumn>
                <TableColumn>Location</TableColumn>
              </TableHeader>
              <TableBody>
                {matches.map((match) => (
                  <TableRow key={match.match_id}>
                    <TableCell>{teams.find((team) => team.team_id === match.home_team_id)?.team_name}</TableCell>
                    <TableCell>{teams.find((team) => team.team_id === match.away_team_id)?.team_name}</TableCell>
                    <TableCell>{new Date(match.match_date).toLocaleString()}</TableCell>
                    <TableCell>{match.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No matches scheduled.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default MatchScheduling;