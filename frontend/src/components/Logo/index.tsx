import React from 'react';

import Image from 'next/image';

const Logo = () => {
    return (
        <div className='w-full aspect-square relative rounded-full overflow-hidden bg-white shadow-[0_0_30px_0_rgba(255,255,255,0.9)] border-neutral-200 border-1'>
            <Image
                className='object-cover scale-75'
                src="/logo.png"
                alt="Logo"
                width={679}
                height={679}
            />
        </div>
    )
}

export default Logo