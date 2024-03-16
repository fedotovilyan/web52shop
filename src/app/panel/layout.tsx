"use client";

import { ReactNode, useState } from "react";
import cls from './layout.module.scss';
import { Sidebar } from "./_components/Sidebar/Sidebar";
import { Header } from "./_components/Header/Header";

export default function AdminPanelLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<div className={cls.layout}>
			<Header
				className={cls.header}
				collapsed={collapsed}
				setCollapsed={setCollapsed}
			/>
			<Sidebar className={cls.sidebar} collapsed={collapsed} />
			<div className={cls.content_wrapper}>
				<main className={cls.content}>
					{children}
				</main>
			</div>
		</div>
	);
}
