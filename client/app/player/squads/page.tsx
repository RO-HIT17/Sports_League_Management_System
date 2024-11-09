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

const SquadView = () => {
  const teamId = 1; // Replace with actual team ID
  const [teamInfo, setTeamInfo] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Mock data for team
    const teamData = {
      team_id: 1,
      team_name: 'Eagles FC',
      coach_name: 'Coach Smith',
    };

    // Mock data for players
    const playersData = [
      {
        player_id: 1,
        player_name: 'John Doe',
        position: 'Forward',
        age: 25,
        team_id: 1,
      },
      {
        player_id: 2,
        player_name: 'Jane Smith',
        position: 'Midfielder',
        age: 22,
        team_id: 1,
      },
      {
        player_id: 3,
        player_name: 'Mike Johnson',
        position: 'Defender',
        age: 28,
        team_id: 1,
      },
      // Add more players as needed
    ];

    // Set state with mock data
    setTeamInfo(teamData);
    setPlayers(playersData);
  }, [teamId]);

  if (!teamInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '16px' }}>
      {/* Team Information */}
      <Card style={{ marginBottom: '16px' }}>
        <CardHeader style={{ fontSize: '24px', color: 'blue' }}>
          <h3>Team Information</h3>
        </CardHeader>
        <CardBody>
          <p>Team Name: {teamInfo.team_name}</p>
          <p>Coach Name: {teamInfo.coach_name}</p>
        </CardBody>
      </Card>

      {/* Players */}
      <Card>
        <CardHeader style={{ fontSize: '24px', color: 'blue' }}>
          <h3>Squad</h3>
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

export default SquadView;