'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Spacer,
} from '@nextui-org/react';

const TeamManager = () => {
  const [teamId, setTeamId] = useState<number | null>(null);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [newPlayer, setNewPlayer] = useState({
    player_id: '',
    player_name: '',
    position: '',
    age: '',
    user_id: '',
  });
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
  const [playerToRemove, setPlayerToRemove] = useState<any>(null);

  const {
    isOpen: isAddPlayerModalOpen,
    onOpenChange: toggleAddPlayerModal,
  } = useDisclosure();
  const {
    isOpen: isRegisterLeagueModalOpen,
    onOpenChange: toggleRegisterLeagueModal,
  } = useDisclosure();
  const {
    isOpen: isEditPlayerModalOpen,
    onOpenChange: toggleEditPlayerModal,
  } = useDisclosure();
  const {
    isOpen: isRemovePlayerModalOpen,
    onOpenChange: toggleRemovePlayerModal,
  } = useDisclosure();

  useEffect(() => {
    const fetchTeamAndPositions = async () => {
      const user_id = localStorage.getItem('user_id');
      const authToken = localStorage.getItem('authToken');
      if (!user_id) {
        console.error('User ID not found in local storage');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/slms/team/getTeam', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ user_id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }

        const data = await response.json();
        setTeamId(data.team_id);
        localStorage.setItem('team_id', data.team_id);

        setPositions(data.positions || []);

       
        fetchPlayers(data.team_id);

        
        fetchLeagues();
      } catch (error) {
        console.error('Error fetching team data:', error);
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

    const fetchLeagues = async () => {
      
      const authToken = localStorage.getItem('authToken');

      try {
        const response = await fetch('http://localhost:5000/slms/team/getLeagues', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leagues');
        }

        const leaguesData = await response.json();
        setLeagues(leaguesData);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };

    fetchTeamAndPositions();
  }, []);

  const handleAddPlayer = async () => {
    if (
      newPlayer.player_name.trim() === '' ||
      newPlayer.position.trim() === '' ||
      newPlayer.age === ''
    ) {
      alert('Please fill in all player details.');
      return;
    }

    const authToken = localStorage.getItem('authToken');
    const team_id = localStorage.getItem('team_id');

    const payload: any = {
      player_name: newPlayer.player_name,
      team_id: team_id,
      position: newPlayer.position,
      age: newPlayer.age,
    };

    if (newPlayer.user_id.trim() !== '') {
      payload.user_id = newPlayer.user_id.trim();
    }

    try {
      const response = await fetch('http://localhost:5000/slms/team/addPlayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to add player.');
        return;
      }

      const addedPlayer = await response.json();

      setPlayers([...players, addedPlayer]);
      toggleAddPlayerModal(false);
      setNewPlayer({ player_id: '', player_name: '', position: '', age: '' });
    } catch (error) {
      console.error('Error adding player:', error);
      alert('An error occurred while adding the player.');
    }
  };

  const handleEditPlayer = async () => {
    if (!newPlayer.player_id) {
      alert('Player ID is required.');
      return;
    }

    const authToken = localStorage.getItem('authToken');

    const data: any = { player_id: newPlayer.player_id };

    if (newPlayer.player_name.trim() !== '') {
      data.player_name = newPlayer.player_name.trim();
    }
    if (newPlayer.position.trim() !== '') {
      data.position = newPlayer.position.trim();
    }
    if (newPlayer.age !== '' && newPlayer.age !== null) {
      data.age = newPlayer.age;
    }

    try {
      const response = await fetch('http://localhost:5000/slms/team/updatePlayer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update player.');
        return;
      }

      const updatedPlayer = await response.json();

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.player_id === updatedPlayer.player_id ? updatedPlayer : player
        )
      );
      toggleEditPlayerModal(false);
      setNewPlayer({ player_id: '', player_name: '', position: '', age: '' });
    } catch (error) {
      console.error('Error updating player:', error);
      alert('An error occurred while updating the player.');
    }
  };

  const handleRemovePlayer = async () => {
    if (!playerToRemove) return;

    const authToken = localStorage.getItem('authToken');

    try {
      const response = await fetch('http://localhost:5000/slms/team/deletePlayer', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ player_id: playerToRemove.player_id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to remove player.');
        return;
      }

      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.player_id !== playerToRemove.player_id)
      );
      toggleRemovePlayerModal(false);
      setPlayerToRemove(null);
    } catch (error) {
      console.error('Error removing player:', error);
      alert('An error occurred while removing the player.');
    }
  };

  const handleRegisterLeague = async () => {
    if (!selectedLeague) {
      alert('Please select a league to register.');
      return;
    }
    
    const authToken = localStorage.getItem('authToken');
    const registeredLeague = leagues.find((l) => l.league_id === selectedLeague);
    const team_id = localStorage.getItem('team_id'); 
  
    if (!team_id) {
      console.error('No team_id found in local storage');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/slms/team/registerInLeague', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ team_id, league_id: selectedLeague }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(`Team ${team_id} registered in league ${registeredLeague.league_name}`);
        alert('Registration successful. Waiting for approval.'); 
        toggleRegisterLeagueModal(false);
        setSelectedLeague(null);
      } else {
        console.error('Failed to register team in league');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openEditPlayerModal = (player: any) => {
    setNewPlayer({
      player_id: player.player_id,
      player_name: player.player_name || '',
      position: player.position || '',
      age: player.age || '',
    });
    toggleEditPlayerModal(true);
  };

  const openRemovePlayerModal = (player: any) => {
    setPlayerToRemove(player);
    toggleRemovePlayerModal(true);
  };

  return (
    <div style={{ padding: '16px' }}>

      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Add New Player</h3>
          <Button auto onPress={toggleAddPlayerModal}>
            Add Player
          </Button>
        </CardHeader>
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Manage Players</h3>
        </CardHeader>
        <CardBody>
          {players.length > 0 ? (
            <Table aria-label="Players" css={{ height: 'auto', minWidth: '100%' }}>
              <TableHeader>
                <TableColumn>Player Id</TableColumn>
                <TableColumn>Player Name</TableColumn>
                <TableColumn>Position</TableColumn>
                <TableColumn>Age</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.player_id}>
                    <TableCell>{player.player_id}</TableCell>
                    <TableCell>{player.player_name}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.age}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        flat
                        color="warning"
                        style={{ marginRight: '8px' }}
                        onPress={() => openEditPlayerModal(player)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        flat
                        color="danger"
                        onPress={() => openRemovePlayerModal(player)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No players found.</p>
          )}
          
        </CardBody>
      </Card>

      <Card>
        <CardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Register Team in League</h3>
          <Button auto onPress={toggleRegisterLeagueModal}>
            Register
          </Button>
        </CardHeader>
      </Card>
      
      <Modal isOpen={isAddPlayerModalOpen} onOpenChange={toggleAddPlayerModal}>
        <ModalContent>
          <ModalHeader>Add Player</ModalHeader>
          <ModalBody>
            <Input
              clearable
              fullWidth
              label="Player Name"
              value={newPlayer.player_name}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, player_name: e.target.value })
              }
            />
            <Select
              label="Position"
              value={newPlayer.position}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, position: e.target.value })
              }
              style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
            >
              {positions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </Select>
            <Input
              clearable
              fullWidth
              label="Age"
              type="number"
              value={newPlayer.age}
              onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
            />
            <Input
              clearable
              fullWidth
              label="User ID (optional)"
              value={newPlayer.user_id}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, user_id: e.target.value })
              }
              placeholder="Enter User ID"
            />
          </ModalBody>
          <ModalFooter>
            <Button flat color="default" onPress={() => toggleAddPlayerModal(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleAddPlayer}>
              Add Player
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      
      <Modal isOpen={isEditPlayerModalOpen} onOpenChange={toggleEditPlayerModal}>
        <ModalContent>
          <ModalHeader>Edit Player</ModalHeader>
          <ModalBody>
            <Input
              clearable
              fullWidth
              label="Player Name"
              value={newPlayer.player_name}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, player_name: e.target.value })
              }
            />
            <Select
              label="Position"
              value={newPlayer.position}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, position: e.target.value })
              }
              style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
            >
              {positions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </Select>
            <Input
              clearable
              fullWidth
              label="Age"
              type="number"
              value={newPlayer.age}
              onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button flat color="default" onPress={() => toggleEditPlayerModal(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleEditPlayer}>
              Update Player
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isRemovePlayerModalOpen} onOpenChange={toggleRemovePlayerModal}>
        <ModalContent>
          <ModalHeader>Confirm Removal</ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to remove{' '}
              <strong>{playerToRemove && playerToRemove.player_name}</strong>?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button flat color="default" onPress={() => toggleRemovePlayerModal(false)}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleRemovePlayer}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isRegisterLeagueModalOpen}
        onOpenChange={toggleRegisterLeagueModal}
      >
        <ModalContent>
          <ModalHeader>Register for a League</ModalHeader>
          <ModalBody>
            <Select
              label="Select League"
              placeholder="Choose a league"
              value={selectedLeague?.toString() || ''}
              onChange={(e) => setSelectedLeague(parseInt(e.target.value))}
              style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
            >
              {leagues.map((league) => (
                <SelectItem key={league.league_id} value={league.league_id.toString()}>
                  {league.league_name}
                </SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button flat color="default" onPress={() => toggleRegisterLeagueModal(false)}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleRegisterLeague}
              disabled={!selectedLeague}
            >
              Register
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TeamManager;	