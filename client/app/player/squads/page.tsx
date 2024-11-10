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
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
   
    const leagueData = [
      {
        league_id: 1,
        league_name: 'Premier League',
        teams: [
          {
            team_id: 1,
            team_name: 'Eagles FC',
            coach_name: 'Coach Smith',
            players: [
              { player_id: 1, player_name: 'John Doe', position: 'Forward', age: 25 },
              { player_id: 2, player_name: 'Jane Smith', position: 'Midfielder', age: 22 },
              { player_id: 3, player_name: 'Mike Johnson', position: 'Defender', age: 28 },
            ],
          },
          {
            team_id: 2,
            team_name: 'Tigers FC',
            coach_name: 'Coach Brown',
            players: [
              { player_id: 4, player_name: 'Alice Brown', position: 'Forward', age: 24 },
              { player_id: 5, player_name: 'Bob White', position: 'Goalkeeper', age: 30 },
            ],
          },
        ],
      },
      {
        league_id: 2,
        league_name: 'Champions League',
        teams: [
          {
            team_id: 3,
            team_name: 'Lions FC',
            coach_name: 'Coach Green',
            players: [
              { player_id: 6, player_name: 'Charlie Black', position: 'Midfielder', age: 27 },
              { player_id: 7, player_name: 'David Blue', position: 'Defender', age: 26 },
            ],
          },
        ],
      },
    ];

    // Set state with mock data
    setLeagues(leagueData);
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      {leagues.map((league) => (
        <Card key={league.league_id} style={{ marginBottom: '16px' }}>
          <CardHeader style={{ fontSize: '24px'}}>
            <h3>{league.league_name}</h3>
          </CardHeader>
          <CardBody>
            {league.teams.map((team) => (
              <div key={team.team_id} style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '20px', color: 'green' }}>{team.team_name}</h4>
                <p>Coach: {team.coach_name}</p>
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
                    {team.players.map((player) => (
                      <TableRow key={player.player_id}>
                        <TableCell>{player.player_name}</TableCell>
                        <TableCell>{player.position}</TableCell>
                        <TableCell>{player.age}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default SquadView;