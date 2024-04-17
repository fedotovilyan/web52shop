"use client";

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div
			style={{
				display: "flex",
				minHeight: "100vh",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: 'column',
				gap: '15px',
			}}
		>
			<h2>Что-то пошло не так!</h2>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Попробовать снова
			</button>
		</div>
	);
}
