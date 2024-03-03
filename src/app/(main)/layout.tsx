import { Header } from "@/widgets/Header/ui/Header";
import cls from './layout.module.css';
import { ReactNode } from "react";

export default function MainLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<div className={cls.layout}>
			<Header />
			<div className={cls.main_wrapper}>
				<main className={cls.main}>{children}</main>
			</div>
		</div>
	);
}
