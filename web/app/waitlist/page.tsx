import HeaderBar from "@/components/ui/HeaderBar";
import Script from "next/script";

export const metadata = {
	title: "NFC Orange | Waitlist",
	description:
		"NFC Orange | Modernize Career Fairs: Embrace the Paperless Revolution.",
};

export default function Waitlist() {
	return (
		<>
			<HeaderBar />
			

			<h1 className="pl-5 pt-[10vh] text-xl">Sorry, we are closing our waitlist at the moment.</h1>
			{/*
			<iframe
				data-tally-src="https://tally.so/r/w7qGNa?transparentBackground=1"
				width="100%"
				height="100%"
				title="NFC Orange | Onboarding"
				style={{
					position: "absolute",
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					border: 0,
					background: "#fff",
				}}
			/>

			<Script
				async
				strategy={"afterInteractive"}
				src="https://tally.so/widgets/embed.js"
			/>
			*/}
		</>
	);
}
