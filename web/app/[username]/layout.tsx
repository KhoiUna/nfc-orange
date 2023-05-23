import client from '@/db/client';
import { Metadata } from 'next';

export default function ViewLayout({ children }: { children: React.ReactNode; }) {
    return (
        <main className="bg-slate-50 min-h-screen">{children}</main>
    )
};


type Props = {
    params: { username: string };
};

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const { username } = params

    const { rows } = await client.query('SELECT first_name, middle_name, last_name FROM users WHERE username=$1', [username])
    const { first_name, middle_name, last_name } = rows[0]

    return {
        title: `${first_name} ${middle_name} ${last_name} | NFC Orange`,
        description: `View ${first_name} ${middle_name} ${last_name}'s profile on NFC Orange!`,
        metadataBase: new URL('https://www.nfcorange.com'),
        openGraph: {
            images: [
                {
                    url: '/images/orange-loader.png',
                    width: 556,
                    height: 624,
                },
            ],
            locale: 'en-US',
            type: 'website',
        }
    };
}