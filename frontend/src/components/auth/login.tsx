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
import { CHECK_CREDENTIALS, LOGIN_URL } from '@/lib/apiEndPoints';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';

const Login = () => {
  const [auth, setAuth] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    appAxios
      .post(CHECK_CREDENTIALS, auth)
      .then((res) => {
        setLoading(false);
        const response = res.data;

        if (response?.status === 200) {
          signIn('credentials', {
            email: auth.email,
            password: auth.password,
            redirect: true,
            callbackUrl: '/',
          });
          toast.success('Logged successfully!');
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response?.status === 422) {
          setErrors(error.response?.data.errors);
        } else if (error.response?.status === 401) {
          toast.error('Invalid Credentials');
        } else {
          toast.error('Something went wrong. Please try again!');
        }
      });
  };

  return (
    <div>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Welcome back to Daily.dev</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit}>
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
                <Label htmlFor="pasword">Pasword</Label>
                <Input
                  id="pasword"
                  value={auth.password}
                  type="password"
                  placeholder="Enter here..."
                  onChange={(e) =>
                    setAuth({ ...auth, password: e.target.value })
                  }
                />
                <span className="text-red-400">{errors.password?.[0]}</span>
              </div>
              <div className="mt-2">
                <Button className="w-full" disabled={loading}>
                  {loading ? 'Processing...' : 'Login'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Login;
