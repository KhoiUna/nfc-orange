import HeaderBar from "@/components/ui/HeaderBar"
import { Footer } from "../page";

export const metadata = {
    title: 'NFC Orange | Terms of Service',
    description: "NFC Orange | Your online identity with a card tap."
}

export default function TermsOfService() {
    return (
        <>
            <HeaderBar />

            <div id="parallax" className="pt-20">
                <div className="bg-white p-3 pb-5 opacity-90">
                    <div className="container mx-auto p-6">
                        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>

                        <h2 className="text-xl font-semibold my-3">1. User Responsibilities</h2>
                        <p>
                            1.1 Eligibility: You must be at least 18 years old to use the NFC Orange platform. By using the Service, you represent and warrant that you meet the age requirement.
                        </p>
                        <p>
                            1.2 Account: You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. Ensure that the information you provide is accurate, complete, and up to date.
                        </p>

                        <h2 className="text-xl font-semibold my-3">2. Intellectual Property</h2>
                        <p>
                            2.1 Ownership: NFC Orange retains all rights, titles, and interests in and to the Service and its content. The Service is protected by copyright, trademark, and other intellectual property laws.
                        </p>
                        <p>
                            2.2 User Content: By using the Service, you grant NFC Orange a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, distribute, and display the content you submit or provide through the Service.
                        </p>

                        <h2 className="text-xl font-semibold my-3">3. Prohibited Conduct</h2>
                        <p>
                            3.1 You agree not to engage in any conduct that:
                        </p>
                        <ul className="list-disc pl-6">
                            <li>Violates any applicable laws or regulations.</li>
                            <li>Infringes upon the rights of others, including intellectual property rights.</li>
                            <li>Harasses, threatens, or intimidates others.</li>
                            <li>Impersonates any person or entity.</li>
                            <li>Promotes or incites violence, hatred, or discrimination.</li>
                            <li>Disrupts or interferes with the functioning of the Service.</li>
                        </ul>

                        <h2 className="text-xl font-semibold my-3">4. Disclaimer of Warranties</h2>
                        <p>
                            4.1 The Service is provided on an {"as is"} and {"as available"} basis. NFC Orange makes no warranties or representations about the accuracy, reliability, availability, or suitability of the Service for any purpose. Use the Service at your own risk.
                        </p>

                        <h2 className="text-xl font-semibold my-3">5. Limitation of Liability</h2>
                        <p>
                            5.1 To the extent permitted by applicable law, NFC Orange and its officers, directors, employees, and agents shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising out of or in connection with the Service.
                        </p>

                        <h2 className="text-xl font-semibold my-3">6. Modifications to the Terms</h2>
                        <p>
                            6.1 NFC Orange reserves the right to modify or update these Terms at any time without prior notice. Any changes to the Terms will be effective immediately upon posting on the Service. It is your responsibility to review the Terms periodically.
                        </p>

                        <h2 className="text-xl font-semibold my-3">7. Termination</h2>
                        <p>
                            7.1 NFC Orange may terminate or suspend your access to the Service, with or without cause and without prior notice, at any time. Upon termination, your right to use the Service will cease immediately.
                        </p>

                        <h2 className="text-xl font-semibold my-3">8. Governing Law</h2>
                        <p>
                            8.1 These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which NFC Orange operates, without regard to its conflict of laws principles.
                        </p>

                        <p>
                            Please review these Terms carefully. If you do not agree with any provision of these Terms, you should not access or use the NFC Orange platform. By using the Service, you acknowledge and accept these Terms in their entirety.
                        </p>

                        <p>
                            If you have any questions or concerns regarding these Terms, please contact us at <a className="underline text-primary font-semibold" href="mailto:nfcorange1@gmail.com">nfcorange1@gmail.com</a>.
                        </p>

                        <p className="mt-4">
                            Last updated: 05/21/2023
                        </p>

                        <p className="mt-4">
                            NFC Orange Team
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}