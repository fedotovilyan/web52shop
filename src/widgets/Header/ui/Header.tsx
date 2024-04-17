import cls from "./Header.module.scss";
import { GlobalSearch } from "@/features/GlobalSearch";
import { HeaderLogo } from "./HeaderLogo/HeaderLogo";
import { CatalogBtn } from "./CatalogBtn/CatalogBtn";
import { AdminOptions } from "./AdminOptions/AdminOptions";
import { ProfileDropdown } from "@/entities/User";

export const Header = () => {
	return (
		<header className={cls.header}>
			<div className={cls.header_block}>
				<HeaderLogo className={cls.header_logo} />
			</div>
			<div className={cls.header_block}>
				<CatalogBtn className={cls.catalog_btn} />
				<GlobalSearch containerClassName={cls.search_input_container} />
			</div>
			<div className={cls.header_block}>
				<ProfileDropdown />
			</div>
			<AdminOptions />
		</header>
	);
};
