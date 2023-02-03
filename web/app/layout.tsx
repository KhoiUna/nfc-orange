'use client'

import "../styles/globals.css"

export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}