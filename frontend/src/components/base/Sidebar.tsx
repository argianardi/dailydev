import Link from 'next/link';
import React from 'react';
import SidebarLinks from './SidebarLinks';

const Sidebar = () => {
  return (
    <div className="w-[260px] border-r p-4 h-full">
      <SidebarLinks />
    </div>
  );
};

export default Sidebar;
