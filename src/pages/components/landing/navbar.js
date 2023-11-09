import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Logo from "../logo";

export default function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);
  const { data: session, status } = useSession()
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {session ?
      <>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Hello, {session.user.name === "" ? session.user.email : session.user.name}
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link href="/projects">
            <Button size="sm" variant="text" className="flex items-center" style={{ml:6, textTransform: 'inherit'}}>
              My Dashboard
            </Button>
          </Link>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link href="/profile" className="flex items-center">
              Profile
            </Link>
          </Typography>
      </>
        :
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link href="/login" className="flex items-center">
              Log in
            </Link>
            
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link href="/register" className="flex items-center">
              Create account
            </Link>
          </Typography>
        </>
      }

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="https://github.com/AnkitPatel12/toolio" target="_blank"
          rel="noopener" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-2xl py-2 px-4 lg:px-8 lg:py-4 sticky top-3">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Logo />
        <div className="hidden lg:block">{navList}</div>
        <Link href="/register">
          <Button variant="gradient" size="sm" className="hidden lg:inline-block" style={{ml:6, textTransform: 'inherit'}}> 
            <span>Get started</span>
          </Button>
        </Link>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
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
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Link href="/register" scroll={false}>
            <Button variant="gradient" size="sm" fullWidth className="mb-2" style={{ml:6, textTransform: 'inherit'}}>
              <span>Get started</span>
            </Button>
          </Link>
        </div>
      </MobileNav>
    </Navbar>
  );
}