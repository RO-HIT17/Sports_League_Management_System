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
} from '@nextui-org/react';

type Team = {
  team_id: number;
  team_name: string;
  coach_name: string;
  created_at: string;
};

type League = {
  league_id: number;
  league_name: string;
  sport_type: string;
  created_by: number;
};

const LeagueManagement = () => {
  const [newTeams, setNewTeams] = useState<Team[]>([]);
  const [approvedTeams, setApprovedTeams] = useState<Team[]>([]);
  const [leagueInfo, setLeagueInfo] = useState<Partial<League>>({
    league_name: '',
    sport_type: '',
  });
  
  const fetchPendingTeams = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:5000/slms/league/getPendingTeams', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNewTeams(data);
      } else {
        console.error('Failed to fetch pending teams');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchApprovedTeams = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:5000/slms/league/getApprovedTeams', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setApprovedTeams(data);
      } else {
        console.error('Failed to fetch approved teams');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchLeagueInfo = async () => {
    const authToken = localStorage.getItem('authToken');
    const league_id = localStorage.getItem('league_id');
    if (!league_id) {
      console.error('No league_id found in local storage');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/slms/league/getLeagueById', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ league_id }),
      });
  
      if (response.ok) {
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        setLeagueInfo(data);
      } else {
        console.error('Failed to fetch league info');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchPendingTeams();
    fetchApprovedTeams();
    fetchLeagueInfo();
  }, []);

  const updateTeamStatus = async (team_id: number, status: string) => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:5000/slms/league/updateStatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ team_id, status }),
      });

      if (response.ok) {
        
        fetchPendingTeams();
        fetchApprovedTeams();
      } else {
        console.error('Failed to update team status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateLeagueInfo = async () => {
    const authToken = localStorage.getItem('authToken');
    const league_id = localStorage.getItem('league_id');
    if (!league_id) {
      console.error('No league_id found in local storage');
      return;
    }
    const updatedInfo = {
      league_id, 
      league_name: leagueInfo.league_name,
      sport_type: leagueInfo.sport_type,
    };
  
    try {
      const response = await fetch('http://localhost:5000/slms/league/updateLeagueInfo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedInfo),
      });
  
      if (response.ok) {
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        setLeagueInfo(data);
        fetchLeagueInfo();
      } else {
        console.error('Failed to edit league info');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Approve New Teams</h3>
        </CardHeader>
        <CardBody>
          {newTeams.length > 0 ? (
            <Table
              aria-label="New Teams"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Team Name</TableColumn>
                <TableColumn>Coach Name</TableColumn>
                <TableColumn>Created At</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {newTeams.map((team) => (
                  <TableRow key={team.team_id}>
                    <TableCell>{team.team_name}</TableCell>
                    <TableCell>{team.coach_name}</TableCell>
                    <TableCell>{new Date(team.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button onClick={() => updateTeamStatus(team.team_id, 'approved')} color="success" variant="bordered" style={{ marginRight: '8px' }}>Approve</Button>
                      <Button onClick={() => updateTeamStatus(team.team_id, 'rejected')} color="danger" variant="bordered">Reject</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No new teams for approval.</p>
          )}
        </CardBody>
      </Card>

      {/* Approved Teams */}
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Approved Teams</h3>
        </CardHeader>
        <CardBody>
          {approvedTeams.length > 0 ? (
            <Table
              aria-label="Approved Teams"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Team Name</TableColumn>
                <TableColumn>Coach Name</TableColumn>
                <TableColumn>Created At</TableColumn>
              </TableHeader>
              <TableBody>
                {approvedTeams.map((team) => (
                  <TableRow key={team.team_id}>
                    <TableCell>{team.team_name}</TableCell>
                    <TableCell>{team.coach_name}</TableCell>
                    <TableCell>{new Date(team.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No approved teams found.</p>
          )}
        </CardBody>
      </Card>

      
      <Card>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Edit League Info</h3>
        </CardHeader>
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              placeholder="League Name"
              value={leagueInfo.league_name}
              onChange={(e) => setLeagueInfo({ ...leagueInfo, league_name: e.target.value })}
            />
            <Input
              placeholder="Sport Type"
              value={leagueInfo.sport_type}
              onChange={(e) => setLeagueInfo({ ...leagueInfo, sport_type: e.target.value })}
            />
            <Button onClick={handleUpdateLeagueInfo}>Update League Info</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LeagueManagement;