import { ProfileBtns } from '@/features/ProfileBtns';
import cls from './Header.module.scss';
import { NavLinks } from './NavLinks/NavLinks';

export const Header = () => {
	return (
		<header className={cls.header}>
			<NavLinks />
			<input />
			<ProfileBtns />
		</header>
	)
};