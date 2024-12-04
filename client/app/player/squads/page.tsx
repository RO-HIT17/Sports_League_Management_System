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
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState({});

  useEffect(() => {
    const fetchPlayerData = async () => {
      const team_id = localStorage.getItem('team_id');
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch('http://localhost:5000/slms/player/getTeam', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ team_id }),
        });

        if (response.ok) {
          const data = await response.json();
          setTeam(data);
        } else {
          console.error('Failed to fetch player data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPlayerData();

    const fetchPlayersByTeamId = async () => {
      try {
        const team_id = localStorage.getItem('team_id');
        const authToken = localStorage.getItem('authToken');
        if (!team_id) {
          console.error('No team_id found in local storage');
          return;
        }

        const response = await fetch('http://localhost:5000/slms/player/getPlayersByTeamId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ team_id }),
        });

        if (response.ok) {
          const data = await response.json();
          setPlayers(data);
        } else {
          console.error('Failed to fetch players by team ID');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPlayersByTeamId();
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      <Card style={{ marginBottom: '16px' }}>
        <CardHeader style={{ fontSize: '24px' }}>
          <h3>{team.team_name}</h3>
        </CardHeader>
        <CardBody>
          
          <p>Coach: {team.coach_name}</p>
          <Table aria-label="Players" css={{ height: 'auto', minWidth: '100%' }}>
            <TableHeader>
              <TableColumn>Player ID</TableColumn>
              <TableColumn>Player Name</TableColumn>
              <TableColumn>Position</TableColumn>
              <TableColumn>Age</TableColumn>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.player_id}>
                  <TableCell>{player.player_id}</TableCell>
                  <TableCell>{player.player_name}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>{player.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default SquadView;