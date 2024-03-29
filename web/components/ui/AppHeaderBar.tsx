'use client'

import NavLink from "./NavLink";
import { Fragment, useState } from "react";

export type NavLinkProps = {
  href: string;
  text: string;
};

const TEXT_COLOR = "text-white";
const TEXT_DECORATION_COLOR = TEXT_COLOR;
const NAV_LINKS: NavLinkProps[] = [
  {
    href: "/dashboard",
    text: "Dashboard",
  },
  {
    href: "/analytics",
    text: "Analytics",
  },
  // {
  //   href: "/job-tools",
  //   text: "Job Tools",
  // },
  // {
  //   href: "/peers",
  //   text: "Peers",
  // },
  {
    href: "/profile",
    text: "Profile",
  },
  {
    href: "/api/logout",
    text: "Logout",
  },
]

const MenuSidebar = ({
  toggleMenu
}: {
  toggleMenu: () => void;
}) => {
  return (
    <>
      {/* Dark overlay */}
      <div
        onClick={() => toggleMenu()}
        className="cursor-pointer sm:hidden absolute left-0 top-0 opacity-90 bg-gradient-to-l from-primary to-white w-[100vw] h-[100vh]"
      ></div>

      {/* Menu sidebar */}
      <div
        className={`${TEXT_COLOR} drop-shadow-xl sm:hidden absolute top-0 right-0 h-[100vh] w-fit`}
      >
        <div className="text-right">
          <button className="sm:hidden mr-3 mt-5" onClick={() => toggleMenu()}>
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

          {/* TODO: feedback form */}
          {/* <Link href={"https://forms.gle/fuXW1XgG7kST3ihr7"} passHref>
            <a target={"_blank"} rel="noopenner noreferrer">
              <p
                className="flex items-center sm:hidden justify-end my-8 text-xl decoration-black"
                onClick={() => toggleMenu()}
              >
                Feedback
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </p>
            </a>
          </Link> */}

          {NAV_LINKS.map((item: any, index: number) => {
            return (
              <Fragment key={index}>
                <p
                  key={index}
                  className={`sm:hidden mx-5 my-8 text-xl ${TEXT_DECORATION_COLOR} font-semibold`}
                  onClick={() => toggleMenu()}
                >
                  {item.text !== 'Logout' && <NavLink href={item.href} text={item.text} />}
                  {item.text === 'Logout' && <a href={item.href}>Logout</a>}
                </p>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

const AppHeaderBar = ({
  title,
}: {
  title: string;
}) => {
  const [menuOpened, setMenuOpened] = useState<Boolean>(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);

  return (
    <header id="header" className="sticky top-0 z-10 shadow-xl">
      <nav
        className={`flex flex-row text-slate-50 py-2 px-3 items-center justify-between`}
      >
        <p className={`p-2 text-xl font-bold ${TEXT_COLOR}`}>{title}</p>

        <div className="flex text-black">
          {/* TODO: feedback form */}
          {/* <Link href={"https://forms.gle/fuXW1XgG7kST3ihr7"} passHref>
            <a target={"_blank"} rel="noopenner noreferrer">
              <p
                className="hidden sm:flex items-center mx-5 text-lg decoration-black"
                onClick={() => toggleMenu()}
              >
                Feedback
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </p>
            </a>
          </Link> */}

          {NAV_LINKS.map((item, index) => (
            <Fragment key={index}>
              <p
                className={`hidden sm:block mx-5 text-lg ${TEXT_DECORATION_COLOR} font-semibold`}
                onClick={() => toggleMenu()}
              >
                {item.text !== 'Logout' && <NavLink href={item.href} text={item.text} />}
                {item.text === 'Logout' && <a href={item.href}>Logout</a>}
              </p>
            </Fragment>
          ))}
        </div>

        {!menuOpened && <button className={`sm:hidden ${TEXT_COLOR}`} onClick={toggleMenu}>
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
        </button>}

        {menuOpened && (
          <MenuSidebar toggleMenu={toggleMenu} />
        )}
      </nav>
    </header>
  );
};

export default AppHeaderBar;
