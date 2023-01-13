import React from "react";
import { Link } from "react-router-dom";
import { _ } from "../assets/style";

export default function Header() {
    return (
        <div className="h-24 flex items-center  shadow text-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
            <div className={_.container + " flex"}>
                <div className="flex-grow">
                    <Link to="/" className="font-black uppercase">
                        Voetbalmatches
                    </Link>
                </div>
                <div>
                    <Link to="/admin" className="transition-colors font-semibold hover:text-blue-500 dark:hover:text-blue-300">
                        Admin
                    </Link>
                </div>
            </div>
        </div>
    );
}
