import Image from "next/image";
import styles from "./page.module.css";
import { Input } from "@/shared/ui";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";

export default function Home() {
	return (
		<div className={styles.main}>
			<Input style={{ marginRight: 15 }} />
			<Button theme={ButtonTheme.Link}>Hello world</Button>
		</div>
	);
}
