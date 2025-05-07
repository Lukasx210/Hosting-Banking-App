/*eslint-disable*/
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

// components

import cn from "classnames";
import {selectAuth, selectCurrentAdmin} from "@/store/auth/selectors";
import {useSelector} from "react-redux";
import UserDropdown from "@/components/Dropdowns/UserDropdown";
import {hasRole} from "@/auth";
import {ROLE_ADMIN, ROLE_MANAGER} from "@/config/serverApiConfig";
import NavLinkItem from "./NavLinkItem";
import {Menu} from "lucide-react";
import logo from "@/assets/img/logo-black.svg";

export default function Navbar({fixed, transparent}) {
    const {isLoading, isSuccess, isLoggedIn} = useSelector(selectAuth);
    const currentAdmin = useSelector(selectCurrentAdmin);
    const [navbarOpen, setNavbarOpen] = useState(false);
    const navItems = [
        {
            name: "Home",
            path: "/",
        },
    ];
    const navItemsLogged = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "My Wallet",
            path: "/profile/wallet",
        },
    ];
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Change 50 to the desired scroll threshold
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const linkClass = cn(
        !isScrolled ? "" : "lg:text-slate-600 lg:hover:text-slate-700",
        ` px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold`
    );
    return (
        <>
            <nav
                className={cn(
                    fixed
                        ? `${
                              isScrolled
                                  ? "fixed top-0 left-0 w-full  bg-slate-50  shadow-lg"
                                  : "absolute bg-transparent"
                          } transition-all duration-300 `
                        : "absolute",
                    transparent ? " text-slate-700" : "text-slate-700",
                    "top-0 z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg"
                )}
            >
                <div
                    className={
                        // transparent
                        //   ? 'bg-transparent '
                        //   : 'text-slate-700 bg-slate-50 ' +
                        "container px-4 mx-auto flex flex-wrap items-center justify-between"
                    }
                >
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link className={cn(linkClass)} to="/">
                            <img
                                src={logo}
                                className="h-8 object-contain"
                                alt="Logo"
                            />
                        </Link>
                        <button
                            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <Menu className="" />
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center lg:bg-opacity-0 lg:shadow-none" +
                            (navbarOpen
                                ? " block rounded shadow-lg"
                                : " hidden")
                        }
                        id="example-navbar-warning"
                    >
                        <ul className="flex flex-col lg:flex-row list-none mr-auto">
                            {isLoggedIn
                                ? navItemsLogged.map((navItem) => {
                                      return (
                                          <NavLinkItem
                                              isScrolled={isScrolled}
                                              key={navItem.name}
                                              {...navItem}
                                          />
                                      );
                                  })
                                : navItems.map((navItem) => {
                                      return (
                                          <NavLinkItem
                                              isScrolled={isScrolled}
                                              key={navItem.name}
                                              {...navItem}
                                          />
                                      );
                                  })}
                            {isLoggedIn &&
                                (hasRole(
                                    ROLE_ADMIN,
                                    currentAdmin?.data?.roles
                                ) ||
                                    hasRole(
                                        ROLE_MANAGER,
                                        currentAdmin?.data?.roles
                                    )) && (
                                    <li className="flex items-center">
                                        <Link className={linkClass} to="/admin">
                                            Admin
                                        </Link>
                                    </li>
                                )}
                        </ul>
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            {isLoggedIn ? (
                                <UserDropdown currentAdmin={currentAdmin} />
                            ) : (
                                <li className="flex items-center">
                                    <Link to="/auth">
                                        <button
                                            className={`outline outline-slate-${
                                                isScrolled
                                                    ? "700"
                                                    : `${
                                                          transparent
                                                              ? "50"
                                                              : "700"
                                                      }`
                                            } text-slate-${
                                                isScrolled
                                                    ? "700"
                                                    : `${
                                                          transparent
                                                              ? "50"
                                                              : "700"
                                                      }`
                                            } text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg  hover:bg-slate-${
                                                isScrolled
                                                    ? "700"
                                                    : `${
                                                          transparent
                                                              ? "bg-transparent"
                                                              : "700"
                                                      }`
                                            }  hover:text-slate-${
                                                isScrolled
                                                    ? "50"
                                                    : `${
                                                          transparent
                                                              ? "300"
                                                              : "50"
                                                      }`
                                            } lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150`}
                                            type="button"
                                        >
                                            Login
                                        </button>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
