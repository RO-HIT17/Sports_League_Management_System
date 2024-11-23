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
      const team_id = localStorage.getItem('team_id');
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch('http://localhost:5000/slms/player/getRecentMatches', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ team_id }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setRecentMatches(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchRecentMatches();
  
  }, []);

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
    <Table aria-label="Upcoming Matches" css={{ height: 'auto', minWidth: '100%' }}>
      <TableHeader>
        <TableColumn>Date</TableColumn>
        <TableColumn>League</TableColumn>
        <TableColumn>Opponent</TableColumn>
        <TableColumn>Match Type</TableColumn>
        <TableColumn>Result</TableColumn>
        <TableColumn>Score</TableColumn>
        <TableColumn>Location</TableColumn>
      </TableHeader>
      <TableBody>
        {recentMatches.map((match, index) => {
          const isHome = match.match_type === 'Home'; // Check if it's a home match

          const opponent = isHome ? match.away_team : match.home_team; // Get opponent based on match type
          const scoreLine = match.scoreline; // Format scoreline
          const result = match.result; // Result (Win, Loss, Draw)

          return (
            <TableRow key={index}>
              <TableCell>{new Date(match.match_date).toLocaleDateString()}</TableCell>
              <TableCell>{match.league_name}</TableCell>
              <TableCell>{opponent}</TableCell>
              <TableCell>{match.match_type}</TableCell>
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