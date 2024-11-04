"use client";
import { title } from "@/components/primitives";
import React, { useState } from 'react';
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Switch } from "@nextui-org/switch";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { useRouter } from 'next/navigation';

export default function Settings() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('abc@gmail.com');
  const [firstname, setFirstName] = useState<string>('John');
  const [lastname, setLastName] = useState<string>('Doe');
  const [role, setRole] = useState<string>('Manager');
  const [username, setUsername] = useState<string>('abc');
  const [password, setPassword] = useState<string | number>('1');
  const [phone, setPhone] = useState<string | number>('9384799275');
  const [profile, setProfile] = useState<File | null>(null);
  const router = useRouter();

  const handleSave = () => {
    alert("Settings saved successfully!");
    // Handle backend operations to update database
  };

  const handleSignOut = () => {
    alert("Signed out");
    router.push('/login');
  };

  const handleImageUpload = (file: File) => {
    setProfile(file);
  };

  const validateEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const isInvalid = React.useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  return (
    <div>
      <span className={title({ color: "violet" })}>Settings</span>
      <Spacer y={4} />
      <Tabs aria-label="options">
        <Tab key="profile" title="Profile">
          <Table hideHeader aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>GENERAL</TableColumn>
              <TableColumn>YOUR DETAILS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>PROFILE PICTURE :</TableCell>
                <TableCell>{profile ? profile.name : 'No image uploaded'}</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>FIRST NAME :</TableCell>
                <TableCell>{firstname}</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>LAST NAME :</TableCell>
                <TableCell>{lastname}</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>USER NAME :</TableCell>
                <TableCell>{username}</TableCell>
              </TableRow>
              <TableRow key="5">
                <TableCell>EMAIL :</TableCell>
                <TableCell>{email}</TableCell>
              </TableRow>
              <TableRow key="6">
                <TableCell>PASSWORD :</TableCell>
                <TableCell>******</TableCell>
              </TableRow>
              <TableRow key="7">
                <TableCell>ROLE :</TableCell>
                <TableCell>{role}</TableCell>
              </TableRow>
              <TableRow key="8">
                <TableCell>PHONE NUMBER :</TableCell>
                <TableCell>{phone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Tab>
        <Tab key="changesettings" title="Change Settings">
          <Input
            label="Profile Picture"
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
            className="max-w-xs"
          />
          <Spacer y={2} />
          <Input
            value={email}
            type="email"
            label="Email"
            variant="bordered"
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : ""}
            errorMessage="Please enter a valid email"
            onValueChange={setEmail}
          />
          <Spacer y={2} />
          <Input
            label="Password"
            type="password"
            variant="bordered"
            clearable
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Spacer y={2} />
          <Input
            label="First Name"
            placeholder="John"
            variant="bordered"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />
          <Spacer y={2} />
          <Input
            clearable
            label="Last Name"
            placeholder="Doe"
            variant="bordered"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
          <Spacer y={2} />
          <Input
            clearable
            label="Username"
            type="text"
            variant="bordered"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <Spacer y={2} />
          <Input
            clearable
            label="Role"
            type="text"
            variant="bordered"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
          />
          <Spacer y={2} />
          <Input
            clearable
            label="Phone"
            type="tel"
            variant="bordered"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
          <Spacer y={2} />
          <Button onClick={handleSave}>Save Settings</Button>
          <Spacer y={16} />
          <Button radius="full" color="danger" onClick={handleSignOut}>
            Sign Out
          </Button>
          <Spacer y={2} />
          <Button color="danger" variant="bordered">
            Delete user
          </Button>
        </Tab>
      </Tabs>
    </div>
  );
}
