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
  Option,
} from '@nextui-org/react';

type Team = {
  team_id: number;
  team_name: string;
};

type Match = {
  match_id: number;
  home_team_id: number;
  away_team_id: number;
  match_date: string;
  location: string;
};

const MatchScheduling = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [newMatch, setNewMatch] = useState<Partial<Match>>({
    home_team_id: undefined,
    away_team_id: undefined,
    match_date: '',
    location: '',
  });

  useEffect(() => {
    // Fetch teams
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:5000/slms/teams');
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    // Fetch matches
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:5000/slms/matches');
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
    try {
      const response = await fetch('http://localhost:5000/slms/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMatch),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule match');
      }

      const scheduledMatch = await response.json();
      setMatches([...matches, scheduledMatch]);
      setNewMatch({ home_team_id: undefined, away_team_id: undefined, match_date: '', location: '' });
    } catch (error) {
      console.error('Error scheduling match:', error);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      {/* Schedule Matches */}
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Schedule Match</h3>
        </CardHeader>
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Select
              placeholder="Select Home Team"
              value={newMatch.home_team_id}
              onChange={(e) => setNewMatch({ ...newMatch, home_team_id: Number(e.target.value) })}
            >
              {teams.map((team) => (
                <Option key={team.team_id} value={team.team_id}>
                  {team.team_name}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="Select Away Team"
              value={newMatch.away_team_id}
              onChange={(e) => setNewMatch({ ...newMatch, away_team_id: Number(e.target.value) })}
            >
              {teams.map((team) => (
                <Option key={team.team_id} value={team.team_id}>
                  {team.team_name}
                </Option>
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

      {/* View Schedule */}
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