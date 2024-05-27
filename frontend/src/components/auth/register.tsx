'use client';

import React, { useState } from 'react';
import { TabsContent } from '../ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import appAxios from '@/lib/axios.config';
import { REGISTER_URL } from '@/lib/apiEndPoints';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';

const Register = () => {
  const [auth, setAuth] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: [],
    username: [],
    email: [],
    password: [],
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    appAxios
      .post(REGISTER_URL, auth)
      .then((res) => {
        setLoading(false);
        // const response = res.data;
        toast.success('Account created successfully! We are logging you!');
        signIn('credentials', {
          email: auth.email,
          password: auth.password,
          redirect: true,
          callbackUrl: '/',
        });
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 422) {
          setErrors(err.response?.data.errors);
        } else {
          toast.error('Someting went wrong!. Please try again!');
        }
      });
  };

  return (
    <div>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Welcome to Daily.dev</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="text"
                  placeholder="Enter here..."
                  value={auth.name}
                  type="name"
                  onChange={(e) => setAuth({ ...auth, name: e.target.value })}
                />
                <span className="text-red-400">{errors.name?.[0]}</span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={auth.username}
                  type="text"
                  placeholder="Enter here..."
                  onChange={(e) =>
                    setAuth({ ...auth, username: e.target.value })
                  }
                />
                <span className="text-red-400">{errors.username?.[0]}</span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter here..."
                  value={auth.email}
                  type="email"
                  onChange={(e) => setAuth({ ...auth, email: e.target.value })}
                />
                <span className="text-red-400">{errors.email?.[0]}</span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">password</Label>
                <Input
                  id="password"
                  value={auth.password}
                  type="password"
                  placeholder="Enter here..."
                  onChange={(e) =>
                    setAuth({ ...auth, password: e.target.value })
                  }
                />
                <span className="text-red-400">{errors.password?.[0]}</span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="passwordConfirmation">
                  Password Confirmation
                </Label>
                <Input
                  id="passwordConfirmation"
                  value={auth.password_confirmation}
                  type="password"
                  placeholder="Enter here..."
                  onChange={(e) =>
                    setAuth({ ...auth, password_confirmation: e.target.value })
                  }
                />
              </div>
              <div className="mt-2">
                <Button className="w-full" disabled={loading}>
                  {loading ? 'Processing...' : 'Register'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Register;
