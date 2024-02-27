import { SearchInput } from "@/shared/ui";
import cls from "./Header.module.scss";
import { NavLinks } from "./NavLinks/NavLinks";
import { ProfileBtns } from "./ProfileBtns/ProfileBtns";

export const Header = () => {
	return (
		<header className={cls.header}>
			<NavLinks />
			<SearchInput
				placeholder="Поиск"
			/>
			<ProfileBtns />
		</header>
	);
};
