import Script from "next/script";

export default function page() {
    return (
        <>
            <iframe
                data-tally-src="https://tally.so/r/w7qGNa?transparentBackground=1"
                width="100%"
                height="100%"
                title="NFC Orange | Onboarding"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    border: 0,
                }} />

            <Script async strategy={'afterInteractive'} src="https://tally.so/widgets/embed.js" />
        </>
    )

}