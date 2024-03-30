"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const HeroSection = () => {
	const [date, setDate] = useState<Date>(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			setDate(now);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const { upcomingCalls } = useGetCalls();

	return (
		<div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
			<div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
				{upcomingCalls && upcomingCalls.length > 0 ? (
					<h2 className="glassmorphism max-w-[270px] rounded p-2 text-center text-base font-normal">
						Upcoming meeting on{" "}
						{(
							upcomingCalls[upcomingCalls.length - 1] as Call
						).state.startsAt?.toLocaleString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</h2>
				) : null}
				<div className="flex flex-col gap-2">
					<h1 className="text-4xl font-extrabold lg:text-7xl">
						{date.toLocaleTimeString("en-US", {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</h1>
					<p className="text-xl font-medium text-main-2 lg:text-2xl">
						{new Intl.DateTimeFormat("en-US", {
							dateStyle: "full",
						}).format(date)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
