import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

import React from 'react';
import SidebarLinks from './SidebarLinks';

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="lg:hidden cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left">
        <SidebarLinks />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
