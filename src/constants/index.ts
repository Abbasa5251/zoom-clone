import {
	Home,
	Videotape,
	CalendarClock,
	CalendarCheck2,
	Plus,
} from "lucide-react";

export const sidebarLinks = [
	{
		label: "Home",
		route: "/",
		imgUrl: Home,
	},
	{
		label: "Upcoming",
		route: "/upcoming",
		imgUrl: CalendarClock,
	},
	{
		label: "Previous",
		route: "/previous",
		imgUrl: CalendarCheck2,
	},
	{
		label: "Recordings",
		route: "/recordings",
		imgUrl: Videotape,
	},
	{
		label: "Personal Room",
		route: "/personal-room",
		imgUrl: Plus,
	},
];

export const avatarImages = [
	"/images/avatar-1.jpeg",
	"/images/avatar-2.jpeg",
	"/images/avatar-3.png",
	"/images/avatar-4.png",
	"/images/avatar-5.png",
];
