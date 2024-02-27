import { Header } from "@/widgets/Header/ui/Header";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	console.log('rerendered');
	return (
		<div>
			<Header />
			<main>{children}</main>
		</div>
	);
}
