import { Header } from "@/widgets/Header/ui/Header";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Header />
			<main>{children}</main>
		</div>
	);
}
