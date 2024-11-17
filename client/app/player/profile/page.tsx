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

const PlayerProfile = () => {
  const [playerInfo, setPlayerInfo] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      const user_id = localStorage.getItem('user_id');
      const authToken = localStorage.getItem('authToken');

      if (!user_id || !authToken) {
        console.error('Missing user_id or authToken in localStorage');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/slms/player/getPlayer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ user_id }),
        });

        if (response.ok) {
          const data = await response.json();
          setPlayerInfo(data.data[0]);
        } else {
          console.error('Failed to fetch player data');
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    const fetchTeamData = async () => {
      const user_id = localStorage.getItem('user_id');
      const authToken = localStorage.getItem('authToken');

      if (!user_id || !authToken) {
        console.error('Missing user_id or authToken in localStorage');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/slms/player/getPlayerTeamInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ user_id }),
        });

        if (response.ok) {
          const data = await response.json();
          setTeamInfo(data);
        } else {
          console.error('Failed to fetch team data');
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchPlayerData();
    fetchTeamData();
  }, []); 

  if (!playerInfo || !teamInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '16px', display: 'flex', gap: '16px' }}>
      
      <Card style={{ flex: 1 }}>
        <CardHeader>
          <h3 style={{ fontSize: '24px' }}>Personal Information</h3>
        </CardHeader>
        <CardBody>
          <p><strong>Name:</strong> {playerInfo.player_name || 'N/A'}</p>
          <p><strong>Position:</strong> {playerInfo.position || 'N/A'}</p>
          <p><strong>Age:</strong> {playerInfo.age || 'N/A'}</p>
          <p><strong>User Name:</strong> {playerInfo.username || 'N/A'}</p>
          <p><strong>Email:</strong> {playerInfo.email || 'N/A'}</p>
        </CardBody>
      </Card>

      
      <Card style={{ flex: 2 }}>
        <CardHeader>
          <h3 style={{ fontSize: '24px' }}>League Participation</h3>
        </CardHeader>
        <CardBody>
          {teamInfo.league_name ? (
            <Table
              aria-label="Leagues"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>League Name</TableColumn>
                <TableColumn>Team Name</TableColumn>
                <TableColumn>Coach Name</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{teamInfo.league_name || 'N/A'}</TableCell>
                  <TableCell>{teamInfo.team_name || 'N/A'}</TableCell>
                  <TableCell>{teamInfo.coach_name || 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <p>No leagues found for the player.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default PlayerProfile;
