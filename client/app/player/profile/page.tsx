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
  const playerId = 1; // Replace with actual player ID
  const [playerInfo, setPlayerInfo] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    // Mock data for player
    const playerData = {
      player_id: 1,
      player_name: 'John Doe',
      position: 'Forward',
      age: 25,
      team_id: 1,
    };

    // Mock data for team
    const teamData = {
      team_id: 1,
      team_name: 'Eagles FC',
      coach_name: 'Coach Smith',
    };

    // Mock data for leagues
    const leagueData = [
      {
        league_id: 1,
        league_name: 'Premier League',
        team_name: 'EFly FC',
        coach_name: 'Dany Smith',
      },
      {
        league_id: 2,
        league_name: 'Champions League',
        team_name: 'Eagles FC',
        coach_name: 'Coach Smith',
      },
    ];

    // Set state with mock data
    setPlayerInfo(playerData);
    setTeamInfo(teamData);
    setLeagues(leagueData);
  }, [playerId]);

  if (!playerInfo || !teamInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '16px', display: 'flex', gap: '16px' }}>
      {/* Personal Information */}
      <Card style={{ flex: 1 }}>
        <CardHeader style={{ fontSize: '24px'}}>
          <h3>Personal Information</h3>
        </CardHeader>
        <CardBody>
          <p>Name: {playerInfo.player_name}</p>
          <p>Position: {playerInfo.position}</p>
          <p>Age: {playerInfo.age}</p>
        </CardBody>
      </Card>

      {/* League Participation */}
      <Card style={{ flex: 2 }}>
        <CardHeader style={{ fontSize: '24px' }}>
          <h3>League Participation</h3>
        </CardHeader>
        <CardBody>
          {leagues.length > 0 ? (
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
                {leagues.map((league) => (
                  <TableRow key={league.league_id}>
                    <TableCell>{league.league_name}</TableCell>
                    <TableCell>{league.team_name}</TableCell>
                    <TableCell>{league.coach_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No leagues found.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default PlayerProfile;