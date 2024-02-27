import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/shared/styles/themes/light.css";
import { Providers } from "@/shared/providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<div className="app light">
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
