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

const Dashboard = () => {
  const teamId = 1; 
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [team, setTeam] = useState({});
  useEffect(() => {

      const fetchPlayerData = async () => {
        const user_id = localStorage.getItem('user_id');
        const authToken = localStorage.getItem('authToken');
        try {
          const response = await fetch('http://localhost:5000/slms/player/getPlayer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ user_id }),
          });
  
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('team_id', data.data[0].team_id);
            setTeam(data);
          } else {
            console.error('Failed to fetch player data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchPlayerData();
  
    
    // Mock data for matches
    const allMatches = [
      {
        match_id: 1,
        league_name: 'Premier League',
        match_date: '2023-10-20',
        location: 'Stadium A',
        home_team_id: 1,
        away_team_id: 2,
        home_team_name: 'Eagles FC',
        away_team_name: 'Tigers FC',
        home_team_score: null,
        away_team_score: null,
      },
      {
        match_id: 2,
        league_name: 'Premier League',
        match_date: '2023-10-10',
        location: 'Stadium B',
        home_team_id: 3,
        away_team_id: 1,
        home_team_name: 'Lions FC',
        away_team_name: 'Eagles FC',
        home_team_score: 2,
        away_team_score: 3,
      },
      {
        match_id: 3,
        league_name: 'Premier League',
        match_date: '2023-11-01',
        location: 'Stadium C',
        home_team_id: 1,
        away_team_id: 4,
        home_team_name: 'Eagles FC',
        away_team_name: 'Bears FC',
        home_team_score: null,
        away_team_score: null,
      },
      {
        match_id: 4,
        league_name: 'Premier League',
        match_date: '2023-11-05',
        location: 'Stadium D',
        home_team_id: 2,
        away_team_id: 1,
        home_team_name: 'Tigers FC',
        away_team_name: 'Eagles FC',
        home_team_score: null,
        away_team_score: null,
      },
      // Add more matches as needed
    ];

    const upcoming = allMatches.filter(
      (match) =>
        (match.home_team_id === teamId || match.away_team_id === teamId) &&
        match.home_team_score === null &&
        match.away_team_score === null
    );
    console.log('Upcoming Matches:', upcoming); // Debugging log
    setUpcomingMatches(upcoming);

    const recent = allMatches.filter(
      (match) =>
        (match.home_team_id === teamId || match.away_team_id === teamId) &&
        new Date(match.match_date) < new Date() &&
        match.home_team_score !== null &&
        match.away_team_score !== null
    );
    console.log('Recent Matches:', recent); // Debugging log
    setRecentMatches(recent);
  }, [teamId]);

  return (
    <div style={{ padding: '16px' }}>
      {/* Upcoming Matches */}
      <Card style={{ marginBottom: '16px' }}>
        <CardHeader>
          <h3 style={{ fontSize: '24px'}}>Upcoming Matches</h3>
        </CardHeader>
        <CardBody>
          {upcomingMatches.length > 0 ? (
            <Table
              aria-label="Upcoming Matches"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Date</TableColumn>
                <TableColumn>League</TableColumn>
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
                      <TableCell>{match.league_name}</TableCell>
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

      {/* Recent Matches */}
      <Card>
        <CardHeader>
          <h3 style={{ fontSize: '24px'}}>Recent Matches</h3>
        </CardHeader>
        <CardBody>
          {recentMatches.length > 0 ? (
            <Table
              aria-label="Recent Matches"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Date</TableColumn>
                <TableColumn>League</TableColumn>
                <TableColumn>Opponent</TableColumn>
                <TableColumn>Result</TableColumn>
                <TableColumn>Score</TableColumn>
                <TableColumn>Location</TableColumn>
              </TableHeader>
              <TableBody>
                {recentMatches.map((match) => {
                  const isHome = match.home_team_id === teamId;
                  const opponent = isHome
                    ? match.away_team_name
                    : match.home_team_name;
                  const teamScore = isHome
                    ? match.home_team_score
                    : match.away_team_score;
                  const opponentScore = isHome
                    ? match.away_team_score
                    : match.home_team_score;
                  const result =
                    teamScore > opponentScore
                      ? 'Win'
                      : teamScore < opponentScore
                      ? 'Loss'
                      : 'Draw';
                  const scoreLine = `${teamScore} - ${opponentScore}`;

                  return (
                    <TableRow key={match.match_id}>
                      <TableCell>{match.match_date}</TableCell>
                      <TableCell>{match.league_name}</TableCell>
                      <TableCell>{opponent}</TableCell>
                      <TableCell>{result}</TableCell>
                      <TableCell>{scoreLine}</TableCell>
                      <TableCell>{match.location}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p>No recent matches.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;