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
import { LOGOUT_URL, UPDATE_PROFILE } from '@/lib/apiEndPoints';
import { signOut, useSession } from 'next-auth/react';
import { Input } from '../ui/input';
import { toast } from 'react-toastify';

const ProfileMenu = () => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    profile_image: [],
  });
  const { data, update } = useSession();
  const user = data?.user as CustomUser;

  const logoutUser = async () => {
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  const updateProfile = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const formDate = new FormData();
    formDate.append('profile_image', image ?? '');

    appAxios
      .post(UPDATE_PROFILE, formDate, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        const response = res.data;
        update({ profile_image: response.image });
        toast.success('Profile updated successfully!');
        setLoading(false);
        setProfileOpen(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response?.status === 422) {
          setErrors(error.response?.data.errors);
          toast.error(errors.profile_image[0]);
        } else {
          toast.error('Something went wrong. Please try again!');
        }
      });
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

      {/* Profile Update Dialog */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={updateProfile}>
            <div className="mb-2">
              <label htmlFor="profile">Profile Image</label>
              <Input
                type="file"
                name="profile"
                id="profile"
                accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                className="file:text-white"
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-2">
              <Button className="w-full" disabled={loading}>
                {loading ? 'Processing...' : 'Update Profile'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Profile Menu Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar image={user?.profile_image ?? undefined} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setProfileOpen(true)}
          >
            Profile
          </DropdownMenuItem>
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
