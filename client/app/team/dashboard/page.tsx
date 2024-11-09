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
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Mock data for teams
    const teamsData = [
      { team_id: 1, team_name: 'Eagles FC', wins: 10, losses: 2, points: 32 },
      { team_id: 2, team_name: 'Tigers FC', wins: 8, losses: 4, points: 28 },
      { team_id: 3, team_name: 'Lions FC', wins: 7, losses: 5, points: 26 },
      { team_id: 4, team_name: 'Bears FC', wins: 6, losses: 6, points: 24 },
      // Add more teams as needed
    ];

    // Mock data for players
    const playersData = [
      { player_id: 1, player_name: 'John Doe', position: 'Forward', age: 25 },
      { player_id: 2, player_name: 'Jane Smith', position: 'Midfielder', age: 22 },
      { player_id: 3, player_name: 'Mike Johnson', position: 'Defender', age: 28 },
      { player_id: 4, player_name: 'Alice Brown', position: 'Goalkeeper', age: 24 },
      { player_id: 5, player_name: 'Bob White', position: 'Forward', age: 27 },
      // Add more players as needed
    ];

    // Filter players for the current team
    const filteredPlayers = playersData.filter(
      (player) => /* Add condition if players are associated with teams */
      true // Replace with actual condition if applicable
    );

    // Set state with mock data
    setTeams(teamsData);
    setPlayers(filteredPlayers);
  }, [teamId]);

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
                <TableColumn>Wins</TableColumn>
                <TableColumn>Losses</TableColumn>
                <TableColumn>Points</TableColumn>
              </TableHeader>
              <TableBody>
                {teams
                  .sort((a, b) => b.points - a.points)
                  .map((team, index) => (
                    <TableRow
                      key={team.team_id}
                      style={{
                        backgroundColor:
                          team.team_id === teamId
                            ? 'rgba(72, 187, 120, 0.2)'
                            : 'transparent',
                      }}
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

      {/* Players */}
      <Card>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Players</h3>
        </CardHeader>
        <CardBody>
          {players.length > 0 ? (
            <Table
              aria-label="Players"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Player Name</TableColumn>
                <TableColumn>Position</TableColumn>
                <TableColumn>Age</TableColumn>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.player_id}>
                    <TableCell>{player.player_name}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.age}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No players found.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Leaderboard;