import { FC, PropsWithChildren } from "react";
import { Button, ButtonProps, ButtonTheme } from "@/shared/ui";
import Link from "next/link";

interface ButtonLinkProps extends ButtonProps, PropsWithChildren {
	href: string;
}

export const ButtonLink: FC<ButtonLinkProps> = (props) => {
	const { href, children, ...rest } = props;

	return (
		<Link href={href}>
			<Button theme={ButtonTheme.Link} {...rest}>
				{children}
			</Button>
		</Link>
	);
};
