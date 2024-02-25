import Image from "next/image";
import styles from "./page.module.css";
import { Alert, Input, Loader } from "@/shared/ui";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { InputPassword } from "@/shared/ui/Input/InputPassword/InputPassword";
import { AlertType } from "@/shared/types/AlertType";

export default function Home() {
	return (
		<div className={styles.main}>
			{/* <Input style={{ marginRight: 15 }} />
			<Button style={{ marginRight: 15 }} theme={ButtonTheme.Link}>
				Hello world
			</Button>
			<InputPassword /> */}
			<Alert />
			<Alert type={AlertType.Error} />
			<Alert type={AlertType.Success} />
			<Alert type={AlertType.Warning} />
		</div>
	);
}
