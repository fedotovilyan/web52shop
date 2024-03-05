import styles from "./page.module.css";
import { Alert } from "@/shared/ui";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
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
			<Alert type={AlertType.Error} closable>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
				distinctio nihil nesciunt! Sunt deleniti delectus, optio aliquam
				exercitationem quaerat similique necessitatibus sapiente modi sint odio!
				Modi omnis quia sequi veritatis. Lorem, ipsum dolor sit amet consectetur
				adipisicing elit. Inventore molestias, odit ullam magnam iure ducimus
				minima. Commodi illum laboriosam quasi praesentium blanditiis ab,
				numquam harum facilis labore pariatur, a perferendis!
			</Alert>
			<Alert type={AlertType.Success} />
			<Alert type={AlertType.Warning} />
			<Button style={{ marginRight: 15 }} theme={ButtonTheme.Primary}>
				Hello world
			</Button>
			<Alert type={AlertType.Error} closable>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
				distinctio nihil nesciunt! Sunt deleniti delectus, optio aliquam
				exercitationem quaerat similique necessitatibus sapiente modi sint odio!
				Modi omnis quia sequi veritatis. Lorem, ipsum dolor sit amet consectetur
				adipisicing elit. Inventore molestias, odit ullam magnam iure ducimus
				minima. Commodi illum laboriosam quasi praesentium blanditiis ab,
				numquam harum facilis labore pariatur, a perferendis!
			</Alert>
			<Alert type={AlertType.Error} closable>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
				distinctio nihil nesciunt! Sunt deleniti delectus, optio aliquam
				exercitationem quaerat similique necessitatibus sapiente modi sint odio!
				Modi omnis quia sequi veritatis. Lorem, ipsum dolor sit amet consectetur
				adipisicing elit. Inventore molestias, odit ullam magnam iure ducimus
				minima. Commodi illum laboriosam quasi praesentium blanditiis ab,
				numquam harum facilis labore pariatur, a perferendis!
			</Alert>
			<Alert type={AlertType.Error} closable>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
				distinctio nihil nesciunt! Sunt deleniti delectus, optio aliquam
				exercitationem quaerat similique necessitatibus sapiente modi sint odio!
				Modi omnis quia sequi veritatis. Lorem, ipsum dolor sit amet consectetur
				adipisicing elit. Inventore molestias, odit ullam magnam iure ducimus
				minima. Commodi illum laboriosam quasi praesentium blanditiis ab,
				numquam harum facilis labore pariatur, a perferendis!
			</Alert>
			<Alert type={AlertType.Error} closable>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
				distinctio nihil nesciunt! Sunt deleniti delectus, optio aliquam
				exercitationem quaerat similique necessitatibus sapiente modi sint odio!
				Modi omnis quia sequi veritatis. Lorem, ipsum dolor sit amet consectetur
				adipisicing elit. Inventore molestias, odit ullam magnam iure ducimus
				minima. Commodi illum laboriosam quasi praesentium blanditiis ab,
				numquam harum facilis labore pariatur, a perferendis!
			</Alert>
			<Alert type={AlertType.Error} closable>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
				distinctio nihil nesciunt! Sunt deleniti delectus, optio aliquam
				exercitationem quaerat similique necessitatibus sapiente modi sint odio!
				Modi omnis quia sequi veritatis. Lorem, ipsum dolor sit amet consectetur
				adipisicing elit. Inventore molestias, odit ullam magnam iure ducimus
				minima. Commodi illum laboriosam quasi praesentium blanditiis ab,
				numquam harum facilis labore pariatur, a perferendis!
			</Alert>
			<Alert type={AlertType.Error} closable>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
				distinctio nihil nesciunt! Sunt deleniti delectus, optio aliquam
				exercitationem quaerat similique necessitatibus sapiente modi sint odio!
				Modi omnis quia sequi veritatis. Lorem, ipsum dolor sit amet consectetur
				adipisicing elit. Inventore molestias, odit ullam magnam iure ducimus
				minima. Commodi illum laboriosam quasi praesentium blanditiis ab,
				numquam harum facilis labore pariatur, a perferendis!
			</Alert>
			<Alert type={AlertType.Error} closable>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
				distinctio nihil nesciunt! Sunt deleniti delectus, optio aliquam
				exercitationem quaerat similique necessitatibus sapiente modi sint odio!
				Modi omnis quia sequi veritatis. Lorem, ipsum dolor sit amet consectetur
				adipisicing elit. Inventore molestias, odit ullam magnam iure ducimus
				minima. Commodi illum laboriosam quasi praesentium blanditiis ab,
				numquam harum facilis labore pariatur, a perferendis!
			</Alert>
			<Alert type={AlertType.Error} closable>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
				distinctio nihil nesciunt! Sunt deleniti delectus, optio aliquam
				exercitationem quaerat similique necessitatibus sapiente modi sint odio!
				Modi omnis quia sequi veritatis. Lorem, ipsum dolor sit amet consectetur
				adipisicing elit. Inventore molestias, odit ullam magnam iure ducimus
				minima. Commodi illum laboriosam quasi praesentium blanditiis ab,
				numquam harum facilis labore pariatur, a perferendis!
			</Alert>
			<Alert type={AlertType.Error} closable>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
				distinctio nihil nesciunt! Sunt deleniti delectus, optio aliquam
				exercitationem quaerat similique necessitatibus sapiente modi sint odio!
				Modi omnis quia sequi veritatis. Lorem, ipsum dolor sit amet consectetur
				adipisicing elit. Inventore molestias, odit ullam magnam iure ducimus
				minima. Commodi illum laboriosam quasi praesentium blanditiis ab,
				numquam harum facilis labore pariatur, a perferendis!
			</Alert>
		</div>
	);
}
