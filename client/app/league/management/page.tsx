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
    // Hardcoded data for new teams
    const staticNewTeamsData: Team[] = [
      { team_id: 1, team_name: 'Eagles FC', coach_name: 'John Doe', created_at: '2023-10-01T10:00:00Z' },
      { team_id: 2, team_name: 'Tigers FC', coach_name: 'Jane Smith', created_at: '2023-10-02T11:00:00Z' },
    ];
    setNewTeams(staticNewTeamsData);

    // Hardcoded data for approved teams
    const staticApprovedTeamsData: Team[] = [
      { team_id: 3, team_name: 'Lions FC', coach_name: 'Mike Johnson', created_at: '2023-09-01T09:00:00Z' },
      { team_id: 4, team_name: 'Bears FC', coach_name: 'Emily Davis', created_at: '2023-09-02T08:00:00Z' },
    ];
    setApprovedTeams(staticApprovedTeamsData);

    // Hardcoded data for league info
    const staticLeagueInfo: Partial<League> = {
      league_name: 'Premier League',
      sport_type: 'Soccer',
    };
    setLeagueInfo(staticLeagueInfo);
  }, []);

  const handleApproveTeam = async (team_id: number) => {
    try {
      // Simulate API call
      setNewTeams(newTeams.filter((team) => team.team_id !== team_id));
      const approvedTeam = newTeams.find((team) => team.team_id === team_id);
      if (approvedTeam) {
        setApprovedTeams([...approvedTeams, approvedTeam]);
      }
    } catch (error) {
      console.error('Error approving team:', error);
    }
  };

  const handleRejectTeam = async (team_id: number) => {
    try {
      // Simulate API call
      setNewTeams(newTeams.filter((team) => team.team_id !== team_id));
    } catch (error) {
      console.error('Error rejecting team:', error);
    }
  };

  const handleUpdateLeagueInfo = async () => {
    try {
      // Simulate API call
      setLeagueInfo(leagueInfo);
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
                      <Button onClick={() => handleApproveTeam(team.team_id)} color="success" variant="bordered" style={{ marginRight: '8px' }}>Approve</Button>
                      <Button onClick={() => handleRejectTeam(team.team_id)} color="danger" variant="bordered">Reject</Button>
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