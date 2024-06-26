import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ADev Zoom App",
	description: "Only app you need to create & schedule meetings",
	icons: {
		icon: "/icons/logo.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ClerkProvider
				appearance={{
					layout: {
						logoPlacement: "inside",
						logoImageUrl: "/icons/logo.svg",
						socialButtonsVariant: "iconButton",
					},
					variables: {
						colorText: "#fff",
						colorPrimary: "#3dcfd3",
						colorBackground: "#1C1F2E",
						colorInputBackground: "#252A41",
						colorInputText: "#fff",
						colorTextOnPrimaryBackground: "#1C1F2E",
					},
				}}
			>
				<body className={`${inter.className} bg-dark-2`}>
					{children}
					<Toaster />
					<Analytics />
					<SpeedInsights />
				</body>
			</ClerkProvider>
		</html>
	);
}
