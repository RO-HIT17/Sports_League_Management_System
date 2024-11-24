'use client';
import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { Input, Button, Card, CardHeader, CardBody, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/navigation'; 

const TeamRegistration = () => {
  const [teamName, setTeamName] = useState('');
  const [teamType, setTeamType] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkUserTeam = async () => {
      const user_id = localStorage.getItem('user_id');
      const authToken = localStorage.getItem('authToken');
      
      if (!user_id) {
        console.error('No user_id found in local storage');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/slms/team/checkTeamUsingUserId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ user_id }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User team:', data);
          if (data.team_id) {
            router.push('/team/dashboard');
          }
        }
      } catch (error) {
        console.error('Error checking user team:', error);
      }
    };

    checkUserTeam();
  }, []);

  const handleRegister = async () => {
    const user_id = localStorage.getItem('user_id');
    const authToken = localStorage.getItem('authToken');
    if (!user_id) {
      console.error('No user_id found in local storage');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/slms/team/registerTeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ user_id, team_name: teamName, team_type: teamType }),
      });

      if (response.ok) {
        router.push('/team/dashboard');
      } else {
        console.error('Failed to register team');
      }
    } catch (error) {
      console.error('Error registering team:', error);
    }
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <Card>
        <CardHeader>
          <h3>Register Team</h3>
        </CardHeader>
        <CardBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <Input
              clearable
              bordered
              fullWidth
              labelPlaceholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
            <Spacer y={1} />
            <Input
              clearable
              bordered
              fullWidth
              labelPlaceholder="Team Type"
              value={teamType}
              onChange={(e) => setTeamType(e.target.value)}
              required
            />
            <Spacer y={1.5} />
            <Button type="submit" shadow color="primary" auto>
              Register
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default TeamRegistration;