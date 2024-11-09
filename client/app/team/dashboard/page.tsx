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

const Leaderboard = () => {
  const teamId = 1; // Replace with the actual team ID managed by the team manager
  const [teams, setTeams] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    // Mock data for teams
    const teamsData = [
      { team_id: 1, team_name: 'Eagles FC', wins: 10, losses: 2, points: 32 },
      { team_id: 2, team_name: 'Tigers FC', wins: 8, losses: 4, points: 28 },
      { team_id: 3, team_name: 'Lions FC', wins: 7, losses: 5, points: 26 },
      { team_id: 4, team_name: 'Bears FC', wins: 6, losses: 6, points: 24 },
      // Add more teams as needed
    ];

    // Mock data for upcoming matches
    const matchesData = [
      {
        match_id: 1,
        match_date: '2023-10-20',
        home_team_id: 1,
        home_team_name: 'Eagles FC',
        away_team_id: 2,
        away_team_name: 'Tigers FC',
        location: 'Stadium A',
      },
      {
        match_id: 2,
        match_date: '2023-10-25',
        home_team_id: 3,
        home_team_name: 'Lions FC',
        away_team_id: 1,
        away_team_name: 'Eagles FC',
        location: 'Stadium B',
      },
      // Add more matches as needed
    ];

    // Filter upcoming matches for the current team
    const filteredMatches = matchesData.filter(
      (match) => match.home_team_id === teamId || match.away_team_id === teamId
    );

    // Set state with mock data
    setTeams(teamsData);
    setUpcomingMatches(filteredMatches);
  }, [teamId]);

  return (
    <div style={{ padding: '16px' }}>
      {/* Leaderboard */}
      <Card style={{ marginBottom: '16px' }}>
        <CardHeader style={{ fontSize: '24px' }}>
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
                <TableColumn>Wins</TableColumn>
                <TableColumn>Losses</TableColumn>
                <TableColumn>Points</TableColumn>
              </TableHeader>
            <TableBody>
                {teams.map((team, index) => (
                    <TableRow
                        key={team.team_id}
                        style={{ backgroundColor: index === 0 ? 'rgba(72, 187, 120, 0.2)' : 'transparent' }}
                    >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{team.team_name}</TableCell>
                        <TableCell>{team.wins}</TableCell>
                        <TableCell>{team.losses}</TableCell>
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
        <CardHeader style={{ fontSize: '24px' }}>
          <h3>Upcoming Matches</h3>
        </CardHeader>
        <CardBody>
          {upcomingMatches.length > 0 ? (
            <Table
              aria-label="Upcoming Matches"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Date</TableColumn>
                <TableColumn>Opponent</TableColumn>
                <TableColumn>Location</TableColumn>
              </TableHeader>
              <TableBody>
                {upcomingMatches.map((match) => {
                  const opponent =
                    match.home_team_id === teamId
                      ? match.away_team_name
                      : match.home_team_name;

                  return (
                    <TableRow key={match.match_id}>
                      <TableCell>{match.match_date}</TableCell>
                      <TableCell>{opponent}</TableCell>
                      <TableCell>{match.location}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p>No upcoming matches.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Leaderboard;