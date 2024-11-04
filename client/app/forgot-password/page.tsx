'use client';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Spacer } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/card";
import { title } from "@/components/primitives";

export const description = "A forgot password form with email input and send OTP option.";

export default function ForgotPasswordForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(90);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/otp/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to send OTP');
        return;
      }
      setError('');
      setSuccess('OTP has been sent to your email');
      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('An error occurred while sending OTP');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/otp/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to verify OTP');
        return;
      }
      setError('');
      setSuccess('OTP verified successfully');
      setOtp('');
      setOtpVerified(true);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('An error occurred while verifying OTP');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/otp/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to reset password');
        return;
      }
      setError('');
      setSuccess('Password has been reset successfully');
      setNewPassword('');
      setConfirmPassword('');
      router.push('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('An error occurred while resetting password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/image.jpg')] bg-cover bg-center">
      <Card className="mx-auto w-96 bg-black bg-opacity-0 p-4 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <h2 className={title({ color: "blue" })}>
            {otpVerified ? 'Reset Password' : otpSent ? 'Enter OTP' : 'Forgot Password'}
          </h2>
        </CardHeader>
        <CardBody>
          {!otpSent ? (
            <form className="grid gap-2" onSubmit={handleSendOTP}>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <Input
                id="email"
                type="email"
                label="Email"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="mt-2 border border-white-500" color="gradient" auto>
                Send OTP
              </Button>
            </form>
          ) : !otpVerified ? (
            <form className="grid gap-2" onSubmit={handleVerifyOTP}>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <Input
                id="otp"
                type="text"
                label="OTP"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <p className="text-gray-400 text-sm">Time remaining: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</p>
              <Button type="submit" className="mt-2 border border-white-500" color="gradient" auto>
                Verify OTP
              </Button>
            </form>
          ) : (
            <form className="grid gap-2" onSubmit={handleResetPassword}>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <Input
                id="new-password"
                type="password"
                label="New Password"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                id="confirm-password"
                type="password"
                label="Confirm Password"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button type="submit" className="mt-2 border border-white-500" color="gradient" auto>
                Reset Password
              </Button>
            </form>
          )}
        </CardBody>
        <CardFooter className="text-center">
          <p className="text-gray-400">
            Remember your password?{" "}
            <Link href="/login" legacyBehavior>
              <a className="text-blue-300">Login</a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
