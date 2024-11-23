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

type Team = {
  team_id: number;
  team_name: string;
  wins: number;
  losses: number;
  points: number;
  matches_played: number;
  draws: number;
};

type Player = {
  player_id: number;
  player_name: string;
  position: string;
  age: number;
};

const Leaderboard = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamId, setTeamId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      const user_id = localStorage.getItem('user_id');
      const authToken = localStorage.getItem('authToken');
      if (!user_id) {
        console.error('User ID not found in local storage');
        return;
      }

      try {
        
        const teamResponse = await fetch('http://localhost:5000/slms/team/getTeam', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ user_id }),
        });

        if (!teamResponse.ok) {
          throw new Error('Failed to fetch team data');
        }

        const teamData = await teamResponse.json();
        setTeamId(teamData.team_id);
        localStorage.setItem('team_id', teamData.team_id);
        console.log('Fetched team data:', teamData);
        
        
        
        await fetchPlayers(teamData.team_id);

      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    const fetchLeagueId = async () => {
      const team_id = localStorage.getItem('team_id');
      const authToken = localStorage.getItem('authToken');
      if (!team_id) {
        console.error('Team ID not found in local storage');
        return;
      }
      try {
        const leagueResponse = await fetch('http://localhost:5000/slms/team/getLeagueIdByTeamId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ team_id }),
        });
        if (!leagueResponse.ok) {
          throw new Error('Failed to fetch league ID');
        } 
        const leagueData = await leagueResponse.json();
        
        localStorage.setItem('league_id', leagueData.league_id);
      } catch (error) {
        console.error('Error fetching league ID:', error);

      }

    }

    const fetchTeamsData = async () => {
      const league_id = localStorage.getItem('league_id');
      const authToken = localStorage.getItem('authToken');
  
      if (!league_id) {
        console.error('No league_id found in local storage');
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/slms/team/getStandings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ league_id }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched teams data:', data);
          setTeams(data); 
        } else {
          console.error('Failed to fetch teams data');
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    const fetchPlayers = async (team_id: number) => {
      const authToken = localStorage.getItem('authToken');
      if (!team_id) {
        console.error('Team ID not found');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/slms/team/getPlayers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ team_id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }

        const playersData = await response.json();
        setPlayers(playersData);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchLeagueId();
    fetchTeamData();
    fetchTeamsData();
    
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Leaderboard</h3>
        </CardHeader>
        <CardBody>
          {teams.length > 0 ? (
            <Table
              aria-label="Leaderboard"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Position</TableColumn>
                <TableColumn>Team Name</TableColumn>
                <TableColumn>Matches Played</TableColumn>
                <TableColumn>Wins</TableColumn>
                <TableColumn>Losses</TableColumn>
                <TableColumn>Draws</TableColumn>
                <TableColumn>Points</TableColumn>
              </TableHeader>
              <TableBody>
                {teams
                  .sort((a, b) => b.points - a.points)
                  .map((team, index) => (
                    <TableRow
                      key={team.team_id}
                      style={{
                        backgroundColor:
                          team.team_id === teamId
                            ? 'rgba(72, 187, 120, 0.2)'
                            : 'transparent',
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{team.team_name}</TableCell>
                      <TableCell>{team.matches_played}</TableCell>
                      <TableCell>{team.wins}</TableCell>
                      <TableCell>{team.losses}</TableCell>
                      <TableCell>{team.draws}</TableCell>
                      <TableCell>{team.points}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <p>No teams found.</p>
          )}
        </CardBody>
      </Card>

      
      <Card>
        <CardHeader style={{ fontSize: '24px', color: '#1976D2' }}>
          <h3>Players</h3>
        </CardHeader>
        <CardBody>
          {players.length > 0 ? (
            <Table
              aria-label="Players"
              css={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Player ID</TableColumn>
                <TableColumn>Player Name</TableColumn>
                <TableColumn>Position</TableColumn>
                <TableColumn>Age</TableColumn>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.player_id}>
                    <TableCell>{player.player_id}</TableCell>
                    <TableCell>{player.player_name}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.age}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No players found.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Leaderboard;
