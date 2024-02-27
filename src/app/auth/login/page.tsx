import { SignIn } from "@/widgets/SignIn";
import cls from "./login.module.scss";
import { Registration } from "@/widgets/Registration";

export default function LoginPage() {
	return (
		<div className={cls.login_page}>
			<SignIn />
		</div>
	);
}
