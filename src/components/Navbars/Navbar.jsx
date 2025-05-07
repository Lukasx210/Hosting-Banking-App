// src/components/layout/Navbar.jsx
import {Link} from "react-router-dom";
import {User, Menu, CreditCard, LogIn} from "lucide-react";
import {useState} from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Menu
                    className="block lg:hidden cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                />
                <Link to="/" className="text-xl font-bold text-sky-600">
                    BankApp
                </Link>
            </div>
            <div className="hidden lg:flex gap-4 text-sm font-medium">
                <Link to="/" className="hover:text-sky-600">
                    Home
                </Link>
                <Link to="/products" className="hover:text-sky-600">
                    Products
                </Link>
                <Link to="/about" className="hover:text-sky-600">
                    About
                </Link>
                <Link to="/contact" className="hover:text-sky-600">
                    Contact
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <Link
                    to="/login"
                    className="text-sm flex items-center gap-1 hover:text-sky-600"
                >
                    <LogIn size={18} /> Login
                </Link>
                <Link
                    to="/profile"
                    className="hidden lg:flex items-center gap-1 hover:text-sky-600"
                >
                    <User size={18} /> Profile
                </Link>
                <Link
                    to="/wallet"
                    className="hidden lg:flex items-center gap-1 hover:text-sky-600"
                >
                    <CreditCard size={18} /> Wallet
                </Link>
            </div>
        </nav>
    );
}
