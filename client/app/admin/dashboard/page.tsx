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
import withAuth from '@/app/hoc/withAuth';

type League = {
  league_id: number;
  league_name: string;
  sport_type: string;
};

type TeamStanding = {
  team_id: number;
  team_name: string;
  matches_played: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;
};

const AdminDashboard = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [standings, setStandings] = useState<{ [key: number]: TeamStanding[] }>({});

  useEffect(() => {
    
    const fetchLeagues = async () => {
      try {
        const response = await fetch('http://localhost:5000/slms/league');
        if (!response.ok) {
          throw new Error('Failed to fetch leagues');
        }
        const data = await response.json();
        setLeagues(data);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };

    
    const fetchStandings = async (league_id: number) => {
      try {
        const response = await fetch(`http://localhost:5000/slms/standings/${league_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch standings');
        }
        const data = await response.json();
        setStandings((prevStandings) => ({ ...prevStandings, [league_id]: data }));
      } catch (error) {
        console.error(`Error fetching standings for league ${league_id}:`, error);
      }
    };

    fetchLeagues().then(() => {
      leagues.forEach((league) => {
        fetchStandings(league.league_id);
      });
    });
  }, [leagues]);

  return (
    <div style={{ padding: '16px' }}>
      <h1>Admin Dashboard</h1>
      {leagues.map((league) => (
        <Card key={league.league_id} style={{ marginBottom: '24px' }}>
          <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
            <h3>{league.league_name} - {league.sport_type}</h3>
          </CardHeader>
          <CardBody>
            {standings[league.league_id] ? (
              <Table
                aria-label={`${league.league_name} Leaderboard`}
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
                  {standings[league.league_id]
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
              <p>Loading standings...</p>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default withAuth(AdminDashboard);