import Image from 'next/image';
import React from 'react';

const UserAvatar = ({ image }: { image?: string }) => {
  return (
    <div className="cursor-pointer">
      {image ? (
        <Image src={image} alt="avatar" width={40} height={40} />
      ) : (
        <Image src="/avatar.png" alt="avatar" width={40} height={40} />
      )}
    </div>
  );
};

export default UserAvatar;
