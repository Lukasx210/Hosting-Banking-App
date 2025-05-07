import React from "react";
import {createPopper} from "@popperjs/core";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {getInitials} from "@/utils/helpers";
import {Link, NavLink} from "react-router-dom";

const UserDropdown = ({image, currentAdmin}) => {
    const user = currentAdmin?.data;
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-end",
            onFirstUpdate: () =>
                window.dispatchEvent(new CustomEvent("scroll")),
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };
    useOnClickOutside(btnDropdownRef, () => closeDropdownPopover());
    return (
        <>
            <div
                className="text-slate-600 hover:text-slate-700 items-center flex cursor-pointer"
                href="#pablo"
                ref={btnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow
                        ? closeDropdownPopover()
                        : openDropdownPopover();
                }}
            >
                <div className="items-center flex">
                    <span className="size-8 text-sm  bg-slate-200 inline-flex items-center justify-center rounded-full">
                        {image ? (
                            <img
                                src={image}
                                alt="..."
                                className="w-full rounded-full align-middle border-none shadow-lg"
                            />
                        ) : user?.lastName + user?.firstName ? (
                            <span className="w-full h-full rounded-full align-middle inline-flex items-center justify-center border-none shadow-lg">
                                {getInitials(
                                    `${user?.lastName} ${user?.firstName}`
                                )}
                            </span>
                        ) : (
                            <U
                                icon={faUserCircle}
                                className="w-full h-full rounded-full align-middle border-none shadow-lg"
                            />
                        )}
                    </span>
                </div>
                <div
                    id="userDropdown"
                    ref={popoverDropdownRef}
                    className={
                        (dropdownPopoverShow ? "block " : "hidden ") +
                        "z-10 bg-slate-50 divide-y divide-slate-100 rounded-lg shadow w-44 "
                    }
                >
                    <div className="px-4 py-3 text-sm text-slate-900 ">
                        <div
                            title={`${user?.lastName} ${user?.firstName}`}
                            className="px-font-medium truncate"
                        >
                            {user?.lastName} {user?.firstName}
                        </div>
                        <div
                            title={user?.email}
                            className="px-font-medium truncate"
                        >
                            {user?.email}
                        </div>
                    </div>
                    <ul
                        className="py-2 text-sm text-slate-700 "
                        aria-labelledby="avatarButton"
                    >
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-slate-100 "
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-slate-100 "
                            >
                                Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-slate-100 "
                            >
                                Balance
                            </a>
                        </li>
                    </ul>
                    <Link to={"/auth/logout"}>
                        <div className="py-1">
                            <div className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 ">
                                Sign out
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <a
          href="#pablo"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700'
          }
          onClick={(e) => e.preventDefault()}
        >
          Action
        </a>
        <a
          href="#pablo"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700'
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700'
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a>
        <div className="h-0 my-2 border border-solid border-slate-100" />
        <a
          href="#pablo"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700'
          }
          onClick={(e) => e.preventDefault()}
        >
          Seprated link
        </a>
      </div> */}
        </>
    );
};

export default UserDropdown;
