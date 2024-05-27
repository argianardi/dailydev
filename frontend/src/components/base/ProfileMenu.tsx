'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserAvatar from '../common/UserAvatar';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';
import appAxios from '@/lib/axios.config';
import { LOGOUT_URL } from '@/lib/apiEndPoints';
import { signOut } from 'next-auth/react';

const ProfileMenu = ({ user }: { user: CustomUser }) => {
  const [logoutOpen, setLogoutOpen] = useState(false);

  const logoutUser = async () => {
    console.log(user.token);
    appAxios
      .post(
        LOGOUT_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        signOut({
          callbackUrl: '/login',
          redirect: true,
        });
      })
      .catch((error) => {});
  };
  return (
    <div>
      {/* Logout Dialog */}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action expire your current session and to access home page
              you have to login again!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4">
            <Button variant="destructive" onClick={logoutUser}>
              Yes Logout!
            </Button>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Menu Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setLogoutOpen(true)}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileMenu;
