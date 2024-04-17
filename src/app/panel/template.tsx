import { ReactNode } from "react";
import { AuthService } from "@/services/AuthService/auth.service";
import { notFound } from "next/navigation";
import { Alert } from "@/shared/ui";
import { AlertType } from "@/shared/types/AlertType";
import { UserRole } from "@/shared/models/User";

const allowedRolesForAdminPanel = [UserRole.Admin];

export default async function PanelTemplate({
	children,
}: {
	children: ReactNode;
}) {
	const result = await AuthService.verifyUserByRefreshToken();

	if (result.status === 401) return notFound();
	if (result.status === 500) {
		return (
			<Alert type={AlertType.Error}>
				Произошли неполадки на сервере. Просим повторить попытку позднее. {result.error}
			</Alert>
		);
	}

	if (!allowedRolesForAdminPanel.includes(result.user.role)) return notFound();

	return <>{children}</>;
}
