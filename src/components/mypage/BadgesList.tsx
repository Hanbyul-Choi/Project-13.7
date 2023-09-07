import React from 'react';

import Image from 'next/image';

export default function BadgesList() {
  return (
    <div className="flex flex-col justify-center my-10">
      <p className="text-black font-semibold text-lg">획득한 뱃지</p>
      <div className="flex flex-wrap justify-start gap-2 pr-2 pt-2 mt-2">
        <Image className="max-w-1/2 max-h-1/2" src={'https://fvkzqozjdtlaogexuuin.supabase.co/storage/v1/object/public/project/badgeImages/badge1.png?t=2023-09-06T17%3A56%3A48.744Z'} alt={'badge image'} width={100} height={100} />
        <Image className="max-w-1/2 max-h-1/2" src={'https://fvkzqozjdtlaogexuuin.supabase.co/storage/v1/object/public/project/badgeImages/badge2.png?t=2023-09-06T18%3A45%3A38.167Z'} alt={'badge image'} width={100} height={100} />
      </div>
    </div>
  );
}
