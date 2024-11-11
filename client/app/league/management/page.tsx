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

  useEffect(() => {
    // Fetch new teams for approval
    const fetchNewTeams = async () => {
      try {
        const response = await fetch('http://localhost:5000/slms/teams/new');
        if (!response.ok) {
          throw new Error('Failed to fetch new teams');
        }
        const data = await response.json();
        setNewTeams(data);
      } catch (error) {
        console.error('Error fetching new teams:', error);
      }
    };

    // Fetch approved teams
    const fetchApprovedTeams = async () => {
      try {
        const response = await fetch('http://localhost:5000/slms/teams/approved');
        if (!response.ok) {
          throw new Error('Failed to fetch approved teams');
        }
        const data = await response.json();
        setApprovedTeams(data);
      } catch (error) {
        console.error('Error fetching approved teams:', error);
      }
    };

    // Fetch league info
    const fetchLeagueInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/slms/league/info');
        if (!response.ok) {
          throw new Error('Failed to fetch league info');
        }
        const data = await response.json();
        setLeagueInfo(data);
      } catch (error) {
        console.error('Error fetching league info:', error);
      }
    };

    fetchNewTeams();
    fetchApprovedTeams();
    fetchLeagueInfo();
  }, []);

  const handleApproveTeam = async (team_id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/slms/teams/approve/${team_id}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to approve team');
      }

      setNewTeams(newTeams.filter((team) => team.team_id !== team_id));
      const approvedTeam = newTeams.find((team) => team.team_id === team_id);
      if (approvedTeam) {
        setApprovedTeams([...approvedTeams, approvedTeam]);
      }
    } catch (error) {
      console.error('Error approving team:', error);
    }
  };

  const handleUpdateLeagueInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/slms/league/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leagueInfo),
      });

      if (!response.ok) {
        throw new Error('Failed to update league info');
      }

      const updatedInfo = await response.json();
      setLeagueInfo(updatedInfo);
    } catch (error) {
      console.error('Error updating league info:', error);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      {/* Approve New Teams */}
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
                      <Button onClick={() => handleApproveTeam(team.team_id)}>Approve</Button>
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

      {/* Edit League Info */}
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