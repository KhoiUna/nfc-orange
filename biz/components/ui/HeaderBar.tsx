'use client'

import NavLink from "./NavLink";
import { useState } from "react";
import Link from "next/link";
import Logo from "../Logo";

export const LOGO_WIDTH = 150;
export const LOGO_WIDTH_HEIGHT_RATIO = 4 / 15;
export const LOGO_HEIGHT = LOGO_WIDTH * LOGO_WIDTH_HEIGHT_RATIO;

type NavLink = {
  href: string;
  text: string;
};
const NAV_LINKS: NavLink[] = [
  {
    href: "/",
    text: "Login",
  },
];

const MenuSidebar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <>
      {/* Dark overlay */}
      <div
        onClick={() => toggleMenu()}
        className="cursor-pointer sm:hidden absolute z-10 left-0 top-0 opacity-90 bg-gradient-to-l from-primary to-white w-[100vw] h-[100vh]"
      ></div>

      {/* Menu sidebar */}
      <div
        className={`text-black drop-shadow-xl sm:hidden absolute z-20 top-0 right-0 h-[100vh] w-fit`}
      >
        <div className="text-right">
          <button
            type="button"
            aria-label="Close dropdown menu"
            className={"sm:hidden mr-3 mt-4 text-white"}
            onClick={() => toggleMenu()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {NAV_LINKS.map((item, index) => (
            <p
              key={index}
              className="sm:hidden mx-5 my-8 text-2xl decoration-white text-white font-semibold"
              onClick={() => toggleMenu()}
            >
              <NavLink href={item.href} text={item.text} />
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

const HeaderBar = () => {
  const [menuOpened, setMenuOpened] = useState<Boolean>(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);

  return (
    <header id="header" className={`fixed w-full z-10`}>
      <nav
        className={`flex text-slate-50 p-3 items-center justify-between`}
      >
        <Link href="/">
          <div className="w-[10rem] h-fit cursor-pointer">
            <Logo />
          </div>
        </Link>

        <div className="flex">
          {NAV_LINKS.length !== 0 &&
            NAV_LINKS.map((item, index) => (
              <p
                key={index}
                className={"hidden sm:block mx-5 text-lg font-semibold text-white drop-shadow-lg"}
                onClick={() => toggleMenu()}
              >
                <NavLink href={item.href} text={item.text} />
              </p>
            ))}
        </div>

        {NAV_LINKS.length !== 0 && !menuOpened && (
          <button
            type="button"
            aria-label="Open dropdown menu"
            className="sm:hidden pb-1 text-white rounded-lg drop-shadow-lg"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        )}

        {menuOpened && <MenuSidebar toggleMenu={toggleMenu} />}
      </nav>
    </header>
  );
};

export default HeaderBar;
