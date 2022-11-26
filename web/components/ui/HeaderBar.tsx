import NavLink from "./NavLink";
import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../Logo";

export const HEADER_BAR_BG_COLOR = "bg-primary";
export const LOGO_WIDTH = 150;
export const LOGO_WIDTH_HEIGHT_RATIO = 4 / 15;
export const LOGO_HEIGHT = LOGO_WIDTH * LOGO_WIDTH_HEIGHT_RATIO;

type NavLink = {
  href: string;
  text: string;
};
const NAV_LINKS: NavLink[] = [
  {
    href: "/shop",
    text: "Shop",
  },
  {
    href: "/about",
    text: "About us",
  },
  {
    href: "/register",
    text: "Register",
  },
  {
    href: "/login",
    text: "Login",
  },
];

const MenuSidebar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <>
      {/* Dark overlay */}
      <div
        onClick={() => toggleMenu()}
        className="cursor-pointer sm:hidden absolute z-10 left-0 top-0 bg-black opacity-[0.2] w-[100vw] h-[100vh]"
      ></div>

      {/* Menu sidebar */}
      <div
        className={`text-black drop-shadow-xl sm:hidden absolute z-20 top-0 right-0 ${HEADER_BAR_BG_COLOR} h-[100vh] w-[60%]`}
      >
        <div className="text-right">
          <button
            type="button"
            className="sm:hidden mr-5 mt-6 text-white"
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
              className="sm:hidden mx-5 my-8 text-2xl underline underline-offset-4 decoration-white text-white font-semibold"
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

interface HeaderBarProps {
  title: string;
}
const HeaderBar = ({ title }: HeaderBarProps) => {
  const [menuOpened, setMenuOpened] = useState<Boolean>(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);

  useEffect(() => {
    const header = document.querySelector("header") as HTMLHeadingElement;
    window.addEventListener("scroll", () => {
      const html = document.querySelector("html") as HTMLHtmlElement;

      if (html.scrollTop === 0)
        return (header.style.animation =
          "1s ease 0s 1 normal forwards running colorFadeOut");

      return (header.style.animation =
        "1s ease 0s 1 normal forwards running colorFadeIn");
    });
  }, []);

  return (
    <header className={`p-2 fixed w-full z-10`}>
      <nav
        className={`flex text-slate-50 pt-4 pb-2 px-3 items-center justify-between`}
      >
        <Link href="/">
          <div className="w-[10rem] h-fit cursor-pointer">
            <Logo />
          </div>
        </Link>

        <div className="flex text-black">
          {NAV_LINKS.length != 0 &&
            NAV_LINKS.map((item, index) => (
              <p
                key={index}
                className="hidden sm:block mx-5 text-lg underline underline-offset-4 decoration-white text-white font-semibold"
                onClick={() => toggleMenu()}
              >
                <NavLink href={item.href} text={item.text} />
              </p>
            ))}
        </div>

        {NAV_LINKS.length != 0 && (
          <button
            type="button"
            className="sm:hidden text-white pb-1"
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
