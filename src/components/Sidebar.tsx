"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
	const pathname = usePathname();
	return (
		<section className="sticky top-0 left-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px] ">
			<div className="flex flex-1 flex-col gap-6 ">
				{sidebarLinks.map((link) => {
					const isActive =
						pathname === link.route ||
						pathname.startsWith(`${link.route}/`);

					return (
						<Link
							href={link.route}
							key={link.route}
							className={cn(
								"flex gap-4 items-center p-4 rounded-lg justify-start",
								{
									"bg-main-1 text-dark-2": isActive,
								}
							)}
						>
							<link.imgUrl height={24} width={24} />
							<p className="text-lg font-semibold max-lg:hidden">
								{link.label}
							</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default Sidebar;
