import Link from "next/link";

export type NavLinkProps = {
  href: string;
  text: string;
};

const NavLink = ({ href, text }: NavLinkProps) => {
  return (
    <Link href={href.toLowerCase()}>
      <span className="cursor-pointer inline">{text}</span>
    </Link>
  );
};

export default NavLink;
