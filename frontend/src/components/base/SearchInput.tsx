import { Search } from 'lucide-react';
import React from 'react';

const SearchInput = () => {
  return (
    <div className="relative hidden lg:block">
      <input
        type="text"
        className="w-full lg:w-[500px] h-12 py-2 outline-none bg-muted rounded-2xl pl-10"
        placeholder="Search here..."
      />
      <Search className="absolute left-2 top-3 h-6 w-6" />
    </div>
  );
};

export default SearchInput;
