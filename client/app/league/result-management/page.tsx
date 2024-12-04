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
  Button,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';

type Match = {
  match_id: number;
  match: string; 
};

type Result = {
  result_id: number;
  match_id: number;
  home_team_score: number;
  away_team_score: number;
  created_at: string;
  league_id: number;
};

const ResultManagement = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [newResult, setNewResult] = useState<Partial<Result>>({
    match_id: 0,
    home_team_score: 0,
    away_team_score: 0,
    
  });

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const league_id = localStorage.getItem('league_id');

    const fetchResults = async () => {
      const response = await fetch('http://localhost:5000/slms/league/getResultsByLeagueId', {
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
    const league_id = localStorage.getItem('league_id');

      try {
        const response = await fetch('http://localhost:5000/slms/league/matchesList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ league_id }),
        });

        if (!response.ok) {
          console.error(`Failed to fetch matches: ${response.statusText}`);
          return;
        }

        const data = await response.json();
        setMatches(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  const handleUpdateResult = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const league_id = localStorage.getItem('league_id');
      if (!authToken) {
        console.error('Authorization token is missing');
        return;
      }

      console.log(newResult);

      if (!newResult.match_id || newResult.home_team_score === undefined || newResult.away_team_score === undefined) {
        
        console.error('Incomplete result data. Please ensure all fields are filled.');
        return;
      }
      
      
      const response = await fetch('http://localhost:5000/slms/league/updateResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newResult),
      });

      if (!response.ok) {
        console.error(`Failed to update result: ${response.statusText}`);
        return;
      }

      const data = await response.json();

      setResults((prevResults) => [
        ...prevResults,
        { ...data, created_at: new Date().toISOString() },
      ]);

      setNewResult({ match_id: 0, home_team_score: 0, away_team_score: 0 });
    } catch (error) {
      console.error('Error updating result:', error);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Update Results</h3>
        </CardHeader>
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
        placeholder="Select Match"
        value={newResult.match_id ?? 0}
        onChange={(value) =>
          setNewResult((prev) => ({
            ...prev,
            match_id: Number(value.target.value),
          }))
        }
      >
        {matches.map((match) => (
          <SelectItem key={match.match_id} value={match.match_id}>
            {match.match}
          </SelectItem>
        ))}
      </Select>
            <Input
              type="number"
              placeholder="Home Team Score"
              value={newResult.home_team_score ?? 0}
              onChange={(e) => setNewResult({ ...newResult, home_team_score: Number(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Away Team Score"
              value={newResult.away_team_score ?? 0}
              onChange={(e) => setNewResult({ ...newResult, away_team_score: Number(e.target.value) })}
            />
            <Button onClick={handleUpdateResult}>Update Result</Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Match History</h3>
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
                  const match = matches.find((m) => m.match_id === result.match_id);
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

export default ResultManagement;