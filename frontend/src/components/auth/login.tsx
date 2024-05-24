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

const Login = () => {
  const [auth, setAuth] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Welcome back to Daily.dev</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form>
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
