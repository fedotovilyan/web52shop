import cls from "./Header.module.scss";
import { ProfileBtns } from "./ProfileBtns/ProfileBtns";
import { GlobalSearch } from "@/features/GlobalSearch";
import { HeaderLogo } from "./HeaderLogo/HeaderLogo";

export const Header = () => {
	return (
		<header className={cls.header}>
			<div className={cls.header_block}>
				<HeaderLogo className={cls.header_logo} />
			</div>
			<div className={cls.header_block}>
				<GlobalSearch
					containerClassName={cls.search_input_container}
				/>
			</div>
			<div className={cls.header_block}>
				<ProfileBtns />
			</div>
		</header>
	);
};
