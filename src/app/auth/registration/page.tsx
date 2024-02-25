import cls from './registration.module.scss';
import { Registration } from "@/widgets/Registration";

export default function RegistrationPage() {

	return (
		<div className={cls.registration_page}>
			<Registration />
		</div>
	);
}