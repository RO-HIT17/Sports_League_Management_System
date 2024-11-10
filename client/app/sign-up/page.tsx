'use client';

import Link from "next/link";
import { useState, FormEvent } from 'react'; 
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/card"; 

import { FaGoogle } from "react-icons/fa"; 
import { title } from "@/components/primitives";

export const description =
  "A sign-up form with first name, last name, email, password, and confirm password. There's an option to sign up with Google and GitHub.";


interface SignUpFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const SignUpPage: React.FC = () => {
  const [error, setError] = useState<string>(''); 
  const [role, setRole] = useState<string>('');
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  }); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    const { name, username, email, password, confirmPassword, role } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/slms/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
        return;
      }

      const data = await response.json();
      console.log('User registered successfully:', data);

    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/image.jpg')] bg-cover bg-center">
      <Card className="mx-auto w-104 bg-black bg-opacity-50 p-4 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <h2 className={title({ color: "violet" })}>Sports League System</h2>
        </CardHeader>
        <CardBody className="p-8">
          <form className="grid gap-2" onSubmit={handleSignUp}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="grid grid-cols-1 gap-2">
              <Input
                id="name"
                type="text"
                label="Name"
                variant="bordered"
                fullWidth
                clearable
                required
                className="bg-transparent col-span-2"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Input
                id="username"
                type="text"
                label="Username"
                variant="bordered"
                fullWidth
                clearable
                required
                className="bg-transparent"
                onChange={handleChange}
              />
              <Select
                id="role"
                label="Role"
                variant="bordered"
                fullWidth
                required
                className="bg-transparent"
                value={role}
                onChange={(e) => handleRoleChange(e.target.value)}
              >
                <SelectItem key="player" value="player">Player</SelectItem>
                <SelectItem key="teammanager" value="teammanager">Team Manager</SelectItem>
                <SelectItem key="leaguemanager" value="leaguemanager">League Manager</SelectItem>
                <SelectItem key="admin" value="admin">Admin</SelectItem>
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Input
                id="email"
                type="email"
                label="Email"
                variant="bordered"
                fullWidth
                clearable
                required
                className="bg-transparent col-span-2"
                onChange={handleChange}
              />
            </div>
            <Input
              id="password"
              type="password"
              label="Password"
              variant="bordered"
              fullWidth
              clearable
              required
              className="bg-transparent"
              onChange={handleChange}
            />
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              variant="bordered"
              fullWidth
              clearable
              required
              className="bg-transparent"
              onChange={handleChange}
            />
            <Button 
              type="submit" 
              className="mt-2 border border-white-500" 
              color="gradient" 
              auto
            >
              Sign Up
            </Button>
            <div className="flex items-center my-2">
              <hr className="flex-grow border-t border-gray-500" />
              <span className="mx-2 text-gray-400">OR</span>
              <hr className="flex-grow border-t border-gray-500" />
            </div>
            <Button
              type="button"
              className="mt-2 border border-white-500 flex items-center justify-center"
              color="gradient"
              auto
            >
              <FaGoogle className="mr-2" />
              Sign Up with Google
            </Button>
          </form>
        </CardBody>
        <CardFooter className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" legacyBehavior>
              <a className="text-blue-300">Login</a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
