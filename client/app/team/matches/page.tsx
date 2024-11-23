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


type Result = {
  result_id: number;
  match_id: number;
  home_team_score: number;
  away_team_score: number;
  created_at: string;
  league_id: number;
};


const MatchOverview = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [results, setResults] = useState<Result[]>([]);

  const team_id = localStorage.getItem('team_id');

  

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const league_id = localStorage.getItem('league_id');

    const fetchResults = async () => {
      const response = await fetch('http://localhost:5000/slms/team/getResultsByLeagueId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ league_id }),
        });

        const data = await response.json();
        console.log(data);
        setResults(data);
    }
    fetchResults();
    }, []);

  useEffect(() => {
    
    const fetchMatches = async () => {
      const authToken = localStorage.getItem('authToken');
      
      try {
      const response = await fetch('http://localhost:5000/slms/team/getUpcomingMatches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          },
        body: JSON.stringify({ team_id }),
      });
      const data = await response.json();
      setUpcomingMatches(data);
      } catch (error) {
        console.error('Error fetching upcoming matches:', error);
      }
    }
    
    

    fetchMatches();
    
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Upcoming Matches</h3>
        </CardHeader>
        <CardBody>
          {upcomingMatches.length > 0 ? (
            <Table
              aria-label="Upcoming Matches"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Date</TableColumn>
                <TableColumn>Time</TableColumn>
                <TableColumn>Opponent</TableColumn>
                <TableColumn>Location</TableColumn>
                <TableColumn>Venue</TableColumn>
              </TableHeader>
              <TableBody>
                {upcomingMatches.map((match) => {
                 
                  return (
                    <TableRow key={match.match_id}>
                      <TableCell>
                        {match.match_date}
                      </TableCell>
                      <TableCell>
                        {match.match_time}
                      </TableCell>
                      <TableCell>{match.opponent}</TableCell>
                      <TableCell>{match.location}</TableCell>
                      <TableCell>{match.match_type}</TableCell>
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
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Recent Matches</h3>
        </CardHeader>
        <CardBody>
          {results.length > 0 ? (
            <Table
              aria-label="Match History"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Match</TableColumn>
                <TableColumn>ScoreLine</TableColumn>
                <TableColumn>Result</TableColumn>
                <TableColumn>Created At</TableColumn>
              </TableHeader>
              <TableBody>
                {results.map((result) => {
                  const match = results.find((m) => m.match_id === result.match_id);
                  return (
                    <TableRow key={result.result_id}>
                      <TableCell>{result.home_team} vs {result.away_team}</TableCell>
                      
                      <TableCell>{result.scoreline}</TableCell>
                      <TableCell>{result.result}</TableCell>
                      <TableCell>{new Date(result.result_created_at).toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p>No match results found.</p>
          )}
        </CardBody>

      </Card>
    </div>
  );
};

export default MatchOverview;