import HeaderBar from "@/components/ui/HeaderBar"
import { Footer } from "../page"

export const metadata = {
    title: 'NFC Orange | Privacy Policy',
    description: "NFC Orange | Your online identity with a card tap."
}

export default function PrivacyPolicy() {
    return (
        <>
            <HeaderBar />

            <div id="parallax" className="pt-20">
                <div className="p-3 pb-5 bg-white opacity-90">
                    <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>

                    <p className="mb-2">
                        At NFC Orange, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform (the {"Service"}).
                    </p>

                    <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
                    <p className="mb-2">
                        We may collect certain personal information that you provide to us, such as your name, email address, and other contact details when you sign up for an NFC Orange account.
                    </p>

                    <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
                    <p className="mb-2">
                        We use your personal information to provide and improve the Service, respond to your inquiries, and communicate with you about our products and services. We do not sell your data to third parties.
                    </p>

                    <h2 className="text-xl font-semibold mb-2">Data Security</h2>
                    <p className="mb-2">
                        We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, please note that no data transmission over the Internet or storage system can be guaranteed to be 100% secure.
                    </p>

                    <h2 className="text-xl font-semibold mb-2">Third-Party Services</h2>
                    <p className="mb-2">
                        The Service may contain links to third-party websites or services that are not owned or controlled by NFC Orange. We are not responsible for the privacy practices of such third parties.
                    </p>

                    <h2 className="text-xl font-semibold mb-2">Changes to this Privacy Policy</h2>
                    <p className="mb-2">
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page. It is your responsibility to review this Privacy Policy periodically for any updates.
                    </p>

                    <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                    <p className="mb-2">
                        If you have any questions or concerns regarding this Privacy Policy, please contact us at <a className="underline text-primary font-semibold" href="mailto:nfcorange1@gmail.com">nfcorange1@gmail.com</a>.
                    </p>

                    <p className="mt-4">
                        Last updated: 05/21/2023
                    </p>

                    <p className="mt-4">
                        NFC Orange Team
                    </p>
                </div>
            </div>

            <Footer />
        </>
    )
}