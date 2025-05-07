import React from "react";
import {Route, Navigate, Routes, Outlet} from "react-router-dom";

// components

import Navbar from "@/components/Navbars/AuthNavbar";
import FooterSmall from "@/components/Footers/FooterSmall";
import background from "@/assets/img/pattern_react.png";
// views

export default function Auth() {
    return (
        <>
            <Navbar fixed />
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <img
                        className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
                        src={background}
                        alt="..."
                    />
                    <Outlet />

                    <FooterSmall absolute />
                </section>
            </main>
        </>
    );
}
