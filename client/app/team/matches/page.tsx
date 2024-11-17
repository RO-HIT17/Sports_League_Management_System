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

const MatchOverview = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const team_id = localStorage.getItem('team_id');
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
    
    const resultsData = [
      {
        match_id: 3,
        match_date: '2023-10-20T19:00:00',
        home_team_id: 1,
        home_team_name: 'Eagles FC',
        away_team_id: 2,
        away_team_name: 'Tigers FC',
        location: 'Stadium A',
        home_team_score: 3,
        away_team_score: 1,
      },
      {
        match_id: 4,
        match_date: '2023-10-15T17:30:00',
        home_team_id: 3,
        home_team_name: 'Lions FC',
        away_team_id: 1,
        away_team_name: 'Eagles FC',
        location: 'Stadium C',
        home_team_score: 2,
        away_team_score: 2,
      },
      
    ];

    fetchMatches();
    setRecentMatches(resultsData);
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
          {recentMatches.length > 0 ? (
            <Table
              aria-label="Recent Matches"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Date</TableColumn>
                <TableColumn>Time</TableColumn>
                <TableColumn>Opponent</TableColumn>
                <TableColumn>Score</TableColumn>
                <TableColumn>Result</TableColumn>
              </TableHeader>
              <TableBody>
                {recentMatches.map((match) => {
                  const isHome = match.home_team_id === team_id;
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

                  return (
                    <TableRow key={match.match_id}>
                      <TableCell>
                        {new Date(match.match_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(match.match_date).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </TableCell>
                      <TableCell>{opponent}</TableCell>
                      <TableCell>
                        {teamScore} - {opponentScore}
                      </TableCell>
                      <TableCell>{result}</TableCell>
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

export default MatchOverview;