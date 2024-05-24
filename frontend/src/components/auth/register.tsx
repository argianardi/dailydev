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

const Register = () => {
  const [auth, setAuth] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Welcome to Daily.dev</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form>
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="text"
                  placeholder="Enter here..."
                  value={auth.name}
                  type="name"
                  onChange={(e) => setAuth({ ...auth, name: e.target.value })}
                />
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
              </div>
              <div className="space-y-1">
                <Label htmlFor="passwordConfirmation">
                  Password Confirmation
                </Label>
                <Input
                  id="passwordConfirmation"
                  value={auth.passwordConfirmation}
                  type="password"
                  placeholder="Enter here..."
                  onChange={(e) =>
                    setAuth({ ...auth, passwordConfirmation: e.target.value })
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
