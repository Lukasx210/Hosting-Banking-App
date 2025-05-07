import {
    ShieldCheck,
    Banknote,
    Lock,
    LogIn,
    UserPlus,
    Wallet2,
} from "lucide-react";
import FooterSmall from "@/components/Footers/FooterSmall";
import {Link} from "react-router-dom";
import Navbar from "@/components/Navbars/AuthNavbar";
import {useSelector} from "react-redux";
import {selectAuth} from "@/store/auth/selectors";

export default function BankingService() {
    const {isLoggedIn} = useSelector(selectAuth);

    return (
        <>
            <Navbar fixed />

            <main>
                {/* Services Section */}
                <section className="relative block py-24 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-black mb-4">
                                Secure & Innovative Banking Services
                            </h2>
                            <p className="text-black text-lg">
                                Powered by blockchain technology, ensuring
                                transparency, trust, and protection for your
                                financial future.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8">
                            {/* Service 1: Blockchain Security */}
                            <div className="w-full md:w-5/12 lg:w-3/12 px-4 text-center">
                                <div className="bg-white text-sky-600 p-5 w-16 h-16 mx-auto shadow-lg rounded-full flex items-center justify-center">
                                    <ShieldCheck size={30} />
                                </div>
                                <h5 className="text-xl mt-5 font-semibold text-black">
                                    Blockchain-Based Security
                                </h5>
                                <p className="mt-2 mb-4 text-black">
                                    Every transaction is encrypted and stored on
                                    an immutable blockchain ledger, making fraud
                                    nearly impossible and ensuring complete
                                    transparency.
                                </p>
                                <p className="mt-2 mb-4 text-black">
                                    🔒 End-to-end encryption
                                    <br />
                                    🔗 Tamper-proof transaction history
                                    <br />
                                    🔍 Real-time auditability
                                </p>
                            </div>

                            {/* Service 2: Smart Contracts for Payments */}
                            <div className="w-full md:w-5/12 lg:w-3/12 px-4 text-center">
                                <div className="bg-white text-sky-600 p-5 w-16 h-16 mx-auto shadow-lg rounded-full flex items-center justify-center">
                                    <Banknote size={30} />
                                </div>
                                <h5 className="text-xl mt-5 font-semibold text-black">
                                    Automated Smart Payments
                                </h5>
                                <p className="mt-2 mb-4 text-black">
                                    Use smart contracts to automate payments,
                                    loan disbursements, and settlements without
                                    intermediaries — faster, cheaper, and more
                                    secure.
                                </p>
                                <p className="mt-2 mb-4 text-black">
                                    ⚡ Instant fund releases
                                    <br />
                                    🤖 No manual errors
                                    <br />
                                    🛡️ Verified digital agreements
                                </p>
                            </div>

                            {/* Service 3: Digital Identity Protection */}
                            <div className="w-full md:w-5/12 lg:w-3/12 px-4 text-center">
                                <div className="bg-white text-sky-600 p-5 w-16 h-16 mx-auto shadow-lg rounded-full flex items-center justify-center">
                                    <Lock size={30} />
                                </div>
                                <h5 className="text-xl mt-5 font-semibold text-black">
                                    Decentralized Identity
                                </h5>
                                <p className="mt-2 mb-4 text-black">
                                    Protect your personal information with
                                    blockchain-based digital identities, giving
                                    you full control over who accesses your
                                    data.
                                </p>
                                <p className="mt-2 mb-4 text-black">
                                    🧩 Zero-knowledge proofs (ZKP)
                                    <br />
                                    🛡️ Self-sovereign identity
                                    <br />
                                    🚀 No centralized vulnerabilities
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-8 flex justify-center gap-4">
                        {!isLoggedIn ? (
                            <>
                                <Link
                                    to="/auth/register"
                                    className="border border-sky-500 text-sky-500 font-bold uppercase text-sm px-6 py-3 rounded flex items-center gap-2 hover:bg-sky-500 hover:text-white hover:shadow-md transition-all duration-300"
                                >
                                    <UserPlus size={20} /> Sign Up
                                </Link>
                                <Link
                                    to="/auth/login"
                                    className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded flex items-center gap-2 shadow hover:shadow-lg focus:outline-none focus:ring transition-all duration-150"
                                >
                                    <LogIn size={20} /> Login
                                </Link>
                            </>
                        ) : (
                            <Link
                                to="/profile/wallet"
                                className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded flex items-center gap-2 shadow hover:shadow-lg focus:outline-none focus:ring transition-all duration-150"
                            >
                                <Wallet2 size={20} /> My Wallet
                            </Link>
                        )}
                    </div>
                </section>

                {/* Contact Section */}
                <section className="relative block py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-sky-50">
                                    <div className="flex-auto p-5 lg:p-10">
                                        <h4 className="text-2xl font-semibold text-black">
                                            Want to Know More?
                                        </h4>
                                        <p className="leading-relaxed mt-1 mb-4 text-black">
                                            Connect with our blockchain
                                            specialists to secure your banking
                                            journey.
                                        </p>

                                        {/* Contact Form */}
                                        <div className="relative w-full mb-3 mt-8">
                                            <label
                                                className="block uppercase text-black text-xs font-bold mb-2"
                                                htmlFor="full-name"
                                            >
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="full-name"
                                                className="border border-sky-300 px-3 py-3 placeholder-gray-500 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="Your Name"
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-black text-xs font-bold mb-2"
                                                htmlFor="email"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="border border-sky-300 px-3 py-3 placeholder-gray-500 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="Your Email Address"
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-black text-xs font-bold mb-2"
                                                htmlFor="message"
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                rows="4"
                                                className="border border-sky-300 px-3 py-3 placeholder-gray-500 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="How can we help you?"
                                            ></textarea>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-sky-600 text-white active:bg-sky-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                                                type="button"
                                            >
                                                Submit Inquiry
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <FooterSmall />
        </>
    );
}
