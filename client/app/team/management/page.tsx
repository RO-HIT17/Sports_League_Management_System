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
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Dropdown, 
  DropdownTrigger,
  DropdownMenu, 
  DropdownItem,
  useDisclosure
} from '@nextui-org/react';
import { Select,SelectItem } from '@nextui-org/react';

const TeamManager = () => {
  const teamId = 1; // Replace with actual team ID
  const [players, setPlayers] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    player_name: '',
    position: '',
    age: '',
  });
  const [selectedLeague, setSelectedLeague] = useState(null);

  // Modal controls using `useDisclosure`
  const { isOpen: isAddPlayerModalOpen, onOpen: openAddPlayerModal, onOpenChange: toggleAddPlayerModal } = useDisclosure();
  const { isOpen: isRegisterLeagueModalOpen, onOpen: openRegisterLeagueModal, onOpenChange: toggleRegisterLeagueModal } = useDisclosure();
  const { isOpen: isEditPlayerModalOpen, onOpen: openEditPlayerModal, onOpenChange: toggleEditPlayerModal } = useDisclosure();
  useEffect(() => {
    // Fetch players (Replace with actual API call)
    const fetchedPlayers = [
      { player_id: 1, player_name: 'John Doe', position: 'Forward', age: 25 },
      { player_id: 2, player_name: 'Jane Smith', position: 'Midfielder', age: 22 },
      // Add more players as needed
    ];
    setPlayers(fetchedPlayers);

    // Fetch leagues (Replace with actual API call)
    const fetchedLeagues = [
      { league_id: 1, league_name: 'Premier League', sport_type: 'Soccer' },
      { league_id: 2, league_name: 'Champions League', sport_type: 'Soccer' },
      // Add more leagues as needed
    ];
    setLeagues(fetchedLeagues);
  }, [teamId]);

  const handleAddPlayer = () => {
    if (
      newPlayer.player_name.trim() === '' ||
      newPlayer.position.trim() === '' ||
      newPlayer.age === ''
    ) {
      alert('Please fill in all player details.');
      return;
    }

    // Add player logic (Replace with actual API call)
    const newId = players.length > 0 ? players[players.length - 1].player_id + 1 : 1;
    const addedPlayer = { player_id: newId, ...newPlayer };
    setPlayers([...players, addedPlayer]);
    toggleAddPlayerModal(false);
    setNewPlayer({ player_name: '', position: '', age: '' });
  };
  const handleEditPlayer = () => {
    if (
      newPlayer.player_name.trim() === '' ||
      newPlayer.position.trim() === '' ||
      newPlayer.age === ''
    ) {
      alert('Please fill in all player details.');
      return;
    }
  
    // Update player logic (Replace with actual API call)
    const updatedPlayers = players.map((player) =>
      player.player_id === newPlayer.player_id ? newPlayer : player
    );
  
    setPlayers(updatedPlayers);
    toggleEditPlayerModal(false);
    setNewPlayer({ player_id: '', player_name: '', position: '', age: '' });
  };
  const handleRemovePlayer = (id) => {
    if (window.confirm('Are you sure you want to remove this player?')) {
      // Remove player logic (Replace with actual API call)
      setPlayers(players.filter((player) => player.player_id !== id));
    }
  };

  const handleRegisterLeague = () => {
    if (!selectedLeague) {
      alert('Please select a league to register.');
      return;
    }
    // Register team in league logic (Replace with actual API call)
    const registeredLeague = leagues.find((l) => l.league_id === selectedLeague);
    console.log(`Team ${teamId} registered in league ${registeredLeague.league_name}`);
    toggleRegisterLeagueModal(false);
    setSelectedLeague(null);
  };

  return (
    <div style={{ padding: '16px' }}>
      {/* Add New Player */}
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Add New Player</h3>
          <Button auto onPress={openAddPlayerModal}>
            Add Player
          </Button>
        </CardHeader>
      </Card>

      {/* Manage Players */}
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Manage Players</h3>
        </CardHeader>
        <CardBody>
          {players.length > 0 ? (
            <Table aria-label="Manage Players" css={{ minWidth: '100%' }}>
              <TableHeader>
                <TableColumn>Player Name</TableColumn>
                <TableColumn>Position</TableColumn>
                <TableColumn>Age</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.player_id}>
                    <TableCell>{player.player_name}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.age}</TableCell>
                    <TableCell>
                      <Button size="sm" flat color="warning" style={{ marginRight: '8px' }} auto onPress={openEditPlayerModal}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        flat
                        color="danger"
                        onPress={() => handleRemovePlayer(player.player_id)}
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

      {/* Register Team in League */}
      <Card>
        <CardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Register Team in League</h3>
          <Button auto onPress={openRegisterLeagueModal}>
            Register
          </Button>
        </CardHeader>
      </Card>
      {/* Modal for Editing Player */}
      <Modal isOpen={isEditPlayerModalOpen} onOpenChange={toggleEditPlayerModal}>   
        <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Edit Player</ModalHeader>
                <ModalBody>
                    <Input
                    clearable
                    fullWidth
                    label="Player Name"
                    value={newPlayer.player_name}
                    onChange={(e) => setNewPlayer({ ...newPlayer, player_name: e.target.value })}
                    />
                    <Select
                    label="Position"
                    value={newPlayer.position}
                    onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
                    style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
                    >
                    <SelectItem value="Forward">Forward</SelectItem>
                    <SelectItem value="Midfielder">Midfielder</SelectItem>
                    <SelectItem value="Defender">Defender</SelectItem>
                    <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
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
                    <Button color="danger" variant="light" onPress={onClose}>
                    Close
                    </Button>
                    <Button color="primary" onPress={handleEditPlayer}>
                    Edit
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>    

      {/* Modal for Adding Player */}
      <Modal isOpen={isAddPlayerModalOpen} onOpenChange={toggleAddPlayerModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add New Player</ModalHeader>
              <ModalBody>
              <Input
                  clearable
                  fullWidth
                  label="Player ID"
                  value={newPlayer.player_id}
                  onChange={(e) => setNewPlayer({ ...newPlayer, player_id: e.target.value })}
                />
                <Input
                  clearable
                  fullWidth
                  label="Player Name"
                  value={newPlayer.player_name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, player_name: e.target.value })}
                />
                <Select
                    label="Position"
                  value={newPlayer.position}
                  onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
                  style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
                >
                  <SelectItem value="Forward">Forward</SelectItem>
                  <SelectItem value="Midfielder">Midfielder</SelectItem>
                  <SelectItem value="Defender">Defender</SelectItem>
                  <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
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
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleAddPlayer}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal for Registering Team in League */}
      <Modal isOpen={isRegisterLeagueModalOpen} onOpenChange={toggleRegisterLeagueModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Register Team in League</ModalHeader>
              <ModalBody>
                <Select
                  label="Select League"
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
                >
                  {leagues.map((league) => (
                    <SelectItem key={league.league_id} value={league.league_id}>
                      {league.league_name}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleRegisterLeague} disabled={!selectedLeague}>
                  Register
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TeamManager;
