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

  useEffect(() => {
    // Hardcoded data for leaderboard
    const staticTeamsData: Team[] = [
      { team_id: 1, team_name: 'Eagles FC', matches_played: 12, wins: 10, losses: 2, draws: 0, points: 32 },
      { team_id: 2, team_name: 'Tigers FC', matches_played: 12, wins: 8, losses: 4, draws: 0, points: 28 },
      { team_id: 3, team_name: 'Lions FC', matches_played: 12, wins: 7, losses: 5, draws: 0, points: 26 },
      { team_id: 4, team_name: 'Bears FC', matches_played: 12, wins: 6, losses: 6, draws: 0, points: 24 },
    ];
    setTeams(staticTeamsData);

    // Hardcoded data for upcoming matches
    const staticMatchesData: Match[] = [
      { match_id: 1, home_team: 'Eagles FC', away_team: 'Tigers FC', match_date: '2023-11-01T15:00:00Z', location: 'Stadium A' },
      { match_id: 2, home_team: 'Lions FC', away_team: 'Bears FC', match_date: '2023-11-02T17:00:00Z', location: 'Stadium B' },
      { match_id: 3, home_team: 'Eagles FC', away_team: 'Lions FC', match_date: '2023-11-03T19:00:00Z', location: 'Stadium C' },
      { match_id: 4, home_team: 'Tigers FC', away_team: 'Bears FC', match_date: '2023-11-04T21:00:00Z', location: 'Stadium D' },
    ];
    setUpcomingMatches(staticMatchesData);
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      {/* Leaderboard */}
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

      {/* Upcoming Matches */}
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