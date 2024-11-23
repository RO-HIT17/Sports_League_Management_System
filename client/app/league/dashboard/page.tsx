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
} from '@nextui-org/react';

type Team = {
  team_id: number;
  team_name: string;
  matches_played: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;
};

type Match = {
  match_id: number;
  home_team: string;
  away_team: string;
  match_date: string;
  location: string;
};

const LeagueDashboard = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);

  const fetchLeagueId = async () => {
    const user_id = localStorage.getItem('user_id');
    const authToken = localStorage.getItem('authToken');

    if (!user_id) {
      console.error('No user_id found in local storage');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/slms/league/getLeagueByCreatedBy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ user_id }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('league_id', data.league_id);
        console.log(`League ID ${data.league_id} stored in local storage`);
      } else {
        console.error('Failed to fetch league ID');
      }
    } catch (error) {
      console.error('Error fetching league ID:', error);
    }
  };


  const fetchTeamsData = async () => {
    const league_id = localStorage.getItem('league_id');
    const authToken = localStorage.getItem('authToken');

    if (!league_id) {
      console.error('No league_id found in local storage');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/slms/league/getStandings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ league_id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched teams data:', data);
        setTeams(data); 
      } else {
        console.error('Failed to fetch teams data');
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };
  const fetchUpcomingMatches = async () => {
    const league_id = localStorage.getItem('league_id');
    const authToken = localStorage.getItem('authToken');
    if (!league_id) {
      console.error('No league_id found in local storage');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/slms/league/getUpcomingMatches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ league_id }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched upcoming matches:', data);
        setUpcomingMatches(data);
      } else {
        console.error('Failed to fetch upcoming matches');
      } 
    } catch (error) {
      console.error('Error fetching upcoming matches:', error);
    }
  }

  useEffect(() => {
    fetchLeagueId();
  }, []);
  
  useEffect(() => {
    fetchUpcomingMatches();
  }, []);

  useEffect(() => {
    fetchTeamsData();
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Leaderboard</h3>
        </CardHeader>
        <CardBody>
          {teams.length > 0 ? (
            <Table
              aria-label="Leaderboard"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Position</TableColumn>
                <TableColumn>Team Name</TableColumn>
                <TableColumn>Matches Played</TableColumn>
                <TableColumn>Wins</TableColumn>
                <TableColumn>Losses</TableColumn>
                <TableColumn>Draws</TableColumn>
                <TableColumn>Points</TableColumn>
              </TableHeader>
              <TableBody>
                {teams
                  .sort((a, b) => b.points - a.points)
                  .map((team, index) => (
                    <TableRow key={team.team_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{team.team_name}</TableCell>
                      <TableCell>{team.matches_played}</TableCell>
                      <TableCell>{team.wins}</TableCell>
                      <TableCell>{team.losses}</TableCell>
                      <TableCell>{team.draws}</TableCell>
                      <TableCell>{team.points}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <p>No teams found.</p>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Upcoming Matches</h3>
        </CardHeader>
        <CardBody>
          {upcomingMatches.length > 0 ? (
            <Table
              aria-label="Upcoming Matches"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Home Team</TableColumn>
                <TableColumn>Away Team</TableColumn>
                <TableColumn>Match Date</TableColumn>
                <TableColumn>Location</TableColumn>
              </TableHeader>
              <TableBody>
                {upcomingMatches.map((match) => (
                  <TableRow key={match.match_id}>
                    <TableCell>{match.home_team}</TableCell>
                    <TableCell>{match.away_team}</TableCell>
                    <TableCell>{new Date(match.match_date).toLocaleString()}</TableCell>
                    <TableCell>{match.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No upcoming matches found.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default LeagueDashboard;
