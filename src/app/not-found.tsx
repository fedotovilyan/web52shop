import Link from "next/link";
import { WEB_ROUTES } from "@/shared/routes";

export default async function NotFound() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: 500,
				flexDirection: "column",
				gap: 15,
			}}
		>
			<h1>404 | Не найдено</h1>
			<p>
				<Link href={WEB_ROUTES.main}>На Главную</Link>
			</p>
		</div>
	);
}
