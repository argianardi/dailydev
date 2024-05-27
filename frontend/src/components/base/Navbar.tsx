import { Button } from '../ui/button';
import { BellIcon } from 'lucide-react';

import Image from 'next/image';
import React from 'react';
import SearchInput from './SearchInput';
import ProfileMenu from './ProfileMenu';
import MobileSidebar from './MobileSidebar';

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center p-2 border-b">
        <MobileSidebar />
        <Image src="/logo.svg" alt="logo" width={120} height={120} />
        <SearchInput />
        <div className="flex items-center space-x-3">
          <Button size="icon" variant="secondary">
            <BellIcon className="w-5 h-5" />
          </Button>
          <ProfileMenu />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
