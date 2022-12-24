import Link from "next/link";

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink = ({ href, text }: NavLinkProps) => {
  return (
    <Link href={href.toLowerCase()} passHref legacyBehavior>
      <span className="cursor-pointer inline">{text}</span>
    </Link>
  );
};

export default NavLink;
