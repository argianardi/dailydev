import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Image from 'next/image';
import React from 'react';
import Login from '@/components/auth/login';
import Register from '@/components/auth/register';

const LoginPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="hidden lg:flex justify-center items-center h-screen">
        <Image
          src={'/auth_img.svg'}
          width={500}
          height={500}
          alt="auth"
          className="w-full object-contain"
        />
      </div>
      <div className="flex justify-center items-center h-scren">
        <Tabs defaultValue="login" className="w-full lg:w-[500px] p-2">
          <div className="flex flex-col justify-start items-start mb-6 w-full ">
            <Image src={'/logo.svg'} width={150} height={150} alt="logo" />
            <h1 className="text-cabbage font-bold text-2xl md:text-3xl mt-2">
              Where developers suffere together
            </h1>
          </div>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <Login />
          <Register />
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
