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
  home_team_id: number;
  away_team_id: number;
  match_date: string;
  location: string;
  home_team_name: string;
  away_team_name: string;
};

type Result = {
  result_id: number;
  match_id: number;
  home_team_score: number;
  away_team_score: number;
  created_at: string;
};

const ResultManagement = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [newResult, setNewResult] = useState<Partial<Result>>({
    match_id: undefined,
    home_team_score: 0,
    away_team_score: 0,
  });

  useEffect(() => {
    // Hardcoded data for matches
    const staticMatchesData: Match[] = [
      { match_id: 1, home_team_id: 1, away_team_id: 2, match_date: '2023-10-01T15:00:00Z', location: 'Stadium A', home_team_name: 'Eagles FC', away_team_name: 'Tigers FC' },
      { match_id: 2, home_team_id: 3, away_team_id: 4, match_date: '2023-10-02T17:00:00Z', location: 'Stadium B', home_team_name: 'Lions FC', away_team_name: 'Bears FC' },
    ];
    setMatches(staticMatchesData);

    // Hardcoded data for results
    const staticResultsData: Result[] = [
      { result_id: 1, match_id: 1, home_team_score: 3, away_team_score: 1, created_at: '2023-10-01T18:00:00Z' },
      { result_id: 2, match_id: 2, home_team_score: 2, away_team_score: 2, created_at: '2023-10-02T20:00:00Z' },
    ];
    setResults(staticResultsData);
  }, []);

  const handleUpdateResult = async () => {
    try {
      // Simulate API call
      const updatedResult = { ...newResult, result_id: results.length + 1, created_at: new Date().toISOString() } as Result;
      setResults([...results, updatedResult]);
      setNewResult({ match_id: undefined, home_team_score: 0, away_team_score: 0 });
    } catch (error) {
      console.error('Error updating result:', error);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      {/* Update Results */}
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Update Results</h3>
        </CardHeader>
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Select
              placeholder="Select Match"
              value={newResult.match_id}
              onChange={(value) => setNewResult({ ...newResult, match_id: Number(value) })}
            >
              {matches.map((match) => (
                <SelectItem key={match.match_id} value={match.match_id.toString()}>
                  {match.home_team_name} vs {match.away_team_name} - {new Date(match.match_date).toLocaleString()}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="number"
              placeholder="Home Team Score"
              value={newResult.home_team_score}
              onChange={(e) => setNewResult({ ...newResult, home_team_score: Number(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Away Team Score"
              value={newResult.away_team_score}
              onChange={(e) => setNewResult({ ...newResult, away_team_score: Number(e.target.value) })}
            />
            <Button onClick={handleUpdateResult}>Update Result</Button>
          </div>
        </CardBody>
      </Card>

      {/* Match History */}
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
                <TableColumn>Home Team Score</TableColumn>
                <TableColumn>Away Team Score</TableColumn>
                <TableColumn>Created At</TableColumn>
              </TableHeader>
              <TableBody>
                {results.map((result) => {
                  const match = matches.find((m) => m.match_id === result.match_id);
                  return (
                    <TableRow key={result.result_id}>
                      <TableCell>{match ? `${match.home_team_name} vs ${match.away_team_name}` : 'Unknown Match'}</TableCell>
                      <TableCell>{result.home_team_score}</TableCell>
                      <TableCell>{result.away_team_score}</TableCell>
                      <TableCell>{new Date(result.created_at).toLocaleString()}</TableCell>
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