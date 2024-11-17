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


interface Match {
  match_date: string;
  league_name: string;
  opponent: string;
  location: string;
  home_team_id: number;
  away_team_id: number;
  home_team_score: number;
  away_team_score: number;
}

const Dashboard = () => {
  const teamId = 1; 
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
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
  
    
    
     const fetchUpcomingMatches = async () => {
      const user_id = localStorage.getItem('user_id');
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch('http://localhost:5000/slms/player/getMatchesByUserId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ user_id }),
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUpcomingMatches(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchUpcomingMatches();


    const fetchRecentMatches = async () => {
      const user_id = localStorage.getItem('user_id');
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch('http://localhost:5000/slms/player/getMatchesByUserId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ user_id }),
        });
        if (response.ok) {
          const data = await response.json();
          setRecentMatches(data.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchRecentMatches();
  
  const hardcodedRecentMatches = [
    {
      match_date: "16/11/2024",
      league_name: "La Liga",
      opponent: "Fighters FC",
      location: "Stadium A",
      home_team_id: 1,
      away_team_id: 2,
      home_team_score: 2,
      away_team_score: 1,
    },
    {
      match_date: "18/11/2024",
      league_name: "La Liga",
      opponent: "MI",
      location: "Stadium A",
      home_team_id: 1,
      away_team_id: 3,
      home_team_score: 1,
      away_team_score: 1,
    },
    {
      match_date: "22/11/2024",
      league_name: "La Liga",
      opponent: "Fighters FC",
      location: "Delhi",
      home_team_id: 2,
      away_team_id: 1,
      home_team_score: 0,
      away_team_score: 3,
    },
  ];

  setRecentMatches(hardcodedRecentMatches);
}, [teamId]);

  return (
    <div style={{ padding: '16px' }}>
      <Card style={{ marginBottom: '16px' }}>
        <CardHeader>
          <h3 style={{ fontSize: '24px' }}>Upcoming Matches</h3>
        </CardHeader>
        <CardBody>
          {upcomingMatches.length > 0 ? (
            <Table aria-label="Upcoming Matches" css={{ height: 'auto', minWidth: '100%' }}>
              <TableHeader>
                <TableColumn>Date</TableColumn>
                <TableColumn>League</TableColumn>
                <TableColumn>Opponent</TableColumn>
                <TableColumn>Location</TableColumn>
              </TableHeader>
              <TableBody>
                {upcomingMatches.map((match, index) => {
                  
                  return (
                    <TableRow key={index}>
                      <TableCell>{match.match_date}</TableCell>
                      <TableCell>{match.league_name}</TableCell>
                      <TableCell>{match.opponent}</TableCell>
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

      <Card>
        <CardHeader>
          <h3 style={{ fontSize: '24px' }}>Recent Matches</h3>
        </CardHeader>
        <CardBody>
          {upcomingMatches.length > 0 ? (
            <Table aria-label="Recent Matches" css={{ height: 'auto', minWidth: '100%' }}>
              <TableHeader>
                <TableColumn>Date</TableColumn>
                <TableColumn>League</TableColumn>
                <TableColumn>Opponent</TableColumn>
                <TableColumn>Result</TableColumn>
                <TableColumn>Score</TableColumn>
                <TableColumn>Location</TableColumn>
              </TableHeader>
              <TableBody>
                {upcomingMatches.map((match, index) => {
                  const isHome = match.home_team_id === teamId;
                  const opponent = isHome ? match.away_team_name : match.home_team_name;
                  const teamScore = isHome ? match.home_team_score : match.away_team_score;
                  const opponentScore = isHome ? match.away_team_score : match.home_team_score;
                  const result =
                    teamScore > opponentScore
                      ? 'Win'
                      : teamScore < opponentScore
                      ? 'Loss'
                      : 'Draw';
                  const scoreLine = `${teamScore} - ${opponentScore}`;

                  return (
                    <TableRow key={index}>
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