import Navbar from '@/components/base/Navbar';
import Sidebar from '@/components/base/Sidebar';
import { getServerSession } from 'next-auth';
import React from 'react';
import {
  CustomSession,
  authOptions,
} from '../api/auth/[...nextauth]/authOptions';

const DailyDevLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = (await getServerSession(authOptions)) as CustomSession | null;

  return (
    <div className="h-screen overflow-y-hidden">
      <Navbar user={session?.user!} />
      <div className="flex">
        <Sidebar />
        <div className="flex justify-center items-center w-full overflow-y-scroll">
          <p>{JSON.stringify(session?.user)}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DailyDevLayout;
