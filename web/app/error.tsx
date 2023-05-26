'use client'

import HeaderBar from '@/components/ui/HeaderBar'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    error: Error
    reset: () => void
}

export default function Error({ error, reset }: Props) {
    return (
        <>
            <HeaderBar />

            <div id='gif-parallax' className="px-3 pt-[25vh] min-h-screen">
                <h1 className='text-2xl text-center font-bold'>Oh no! Something goes wrong!</h1>
                <h2 className='text-2xl text-center font-bold'>Click the image below to reset your session.</h2>

                <Link href={'/api/logout'}>
                    <Image
                        className='m-auto'
                        src={'/images/error.png'}
                        alt='NFC Orange error image'
                        width={300}
                        height={300}
                    />
                </Link>
            </div>
        </>
    );
}