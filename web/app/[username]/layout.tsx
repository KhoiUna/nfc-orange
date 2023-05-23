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

    return {
        title: `${username} | NFC Orange`,
        description: `View @${username}'s profile on NFC Orange!`,
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