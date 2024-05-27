import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const UserAvatar = ({ image }: { image?: string }) => {
  return (
    <div>
      {image ? (
        <Image
          src={getImageUrl(image)}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <Image src="/avatar.png" alt="avatar" width={40} height={40} />
      )}
    </div>
  );
};

export default UserAvatar;
