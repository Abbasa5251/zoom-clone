import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
	return (
		<nav className="flex-between fixed z-50 w-full bg-white dark:bg-dark-1 px-6 py-4 lg:px-10">
			<Link href={"/"} className="flex items-center gap-1">
				<Image
					src={"/icons/logo.svg"}
					alt="logo"
					width={32}
					height={32}
				/>
				<p className="text-[26px] font-extrabold text-main-1 dark:text-white max-sm:hidden">
					ADev Zoom
				</p>
			</Link>

			<div className="flex-between gap-5">
				<ThemeToggle />
				<SignedIn>
					<UserButton afterSignOutUrl="/sign-in" />
				</SignedIn>
				<MobileNav />
			</div>
		</nav>
	);
};

export default Navbar;
