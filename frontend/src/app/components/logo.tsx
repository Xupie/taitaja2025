import Image from "next/image";

export function HamburgerMenu() {
  return (
    <Image
      src={`/hamburger-menu/hamburger-menu.svg`}
      alt={"icon of mobile navigation menu"}
      width={36}
      height={36}
      className={"hover"}
      unoptimized={true}
    />
  );
}