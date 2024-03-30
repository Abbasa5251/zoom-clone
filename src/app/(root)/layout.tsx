import { StreamVideoProvider } from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React, { ReactNode } from "react";


export const metadata: Metadata = {
	title: "ADev Zoom App",
	description: "Only app you need to create & schedule meetings",
	icons: {
		icon: "/icons/logo.svg",
	},
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main>
			<StreamVideoProvider>{children}</StreamVideoProvider>
		</main>
	);
};

export default RootLayout;
