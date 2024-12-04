'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Card, CardHeader, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import withAuth from '@/app/hoc/withAuth';

type League = {
  league_id: number;
  league_name: string;
  sport_type: string;
};

const AddLeague = () => {
  const [leagueName, setLeagueName] = useState('');
  const [sportType, setSportType] = useState('');
  const [leagues, setLeagues] = useState<League[]>([]);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [totalTeams, setTotalTeams] = useState(0);
  const router = useRouter();

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

    
    const fetchTotalPlayers = async () => {
      try {
        const response = await fetch('http://localhost:5000/slms/player/count');
        if (!response.ok) {
          throw new Error('Failed to fetch total players');
        }
        const data = await response.json();
        setTotalPlayers(data.count);
      } catch (error) {
        console.error('Error fetching total players:', error);
      }
    };

    
    const fetchTotalTeams = async () => {
      try {
        const response = await fetch('http://localhost:5000/slms/team/count');
        if (!response.ok) {
          throw new Error('Failed to fetch total teams');
        }
        const data = await response.json();
        setTotalTeams(data.count);
      } catch (error) {
        console.error('Error fetching total teams:', error);
      }
    };

    fetchLeagues();
    fetchTotalPlayers();
    fetchTotalTeams();
  }, []);

  const handleAddLeague = async () => {
    const createdBy = localStorage.getItem('user_id');
    const authToken = localStorage.getItem('authToken');

    if (!createdBy) {
      console.error('No user_id found in local storage');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/slms/league', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          league_name: leagueName,
          sport_type: sportType,
          created_by: createdBy,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add league');
      }

      const data = await response.json();
      console.log('League added:', data);
      setLeagues([...leagues, data]);
      setLeagueName('');
      setSportType('');
    } catch (error) {
      console.error('Error adding league:', error);
    }
  };

  const handleDeleteLeague = async (league_id: number) => {
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await fetch(`http://localhost:5000/slms/league/${league_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete league');
      }

      setLeagues(leagues.filter((league) => league.league_id !== league_id));
    } catch (error) {
      console.error('Error deleting league:', error);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Add New League</h3>
        </CardHeader>
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              placeholder="League Name"
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
            />
            <Input
              placeholder="Sport Type"
              value={sportType}
              onChange={(e) => setSportType(e.target.value)}
            />
            <Button onClick={handleAddLeague}>Add League</Button>
          </div>
        </CardBody>
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Leagues</h3>
        </CardHeader>
        <CardBody>
          <Table
            aria-label="Leagues"
            css={{ height: 'auto', minWidth: '100%' }}
          >
            <TableHeader>
              <TableColumn>League Name</TableColumn>
              <TableColumn>Sport Type</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {leagues.map((league) => (
                <TableRow key={league.league_id}>
                  <TableCell>{league.league_name}</TableCell>
                  <TableCell>{league.sport_type}</TableCell>
                  <TableCell>
                    <Button color="danger"
                      variant="bordered"
                     onClick={() => handleDeleteLeague(league.league_id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Statistics</h3>
        </CardHeader>
        <CardBody>
          <p>Total Players: {totalPlayers}</p>
          <p>Total Teams: {totalTeams}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default withAuth(AddLeague);