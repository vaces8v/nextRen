'use client'

import styles from'./Menu.module.css';
import { MenuItems } from './../MenuItems/MenuItems';
import { useSelector } from 'react-redux';

export const Menu = () => {

	const user = useSelector((state) => state.auth.user);

	return (
		<>
		<div className={styles.menuHeader}>
			<div className={styles.menuMain}>
				{/* <MenuAvatar /> */}
			<div className={styles.menuWrapper}>
				
			<div className={styles.mainMenu}>
				<MenuItems source={`/home.svg`} name={'Home'} />
				<MenuItems source={`/bell.svg`} name={'Bell'} />
				<MenuItems source={`/tasks.svg`} name={'Tasks'} />
				<MenuItems source={`/projects.svg`} name={'Files'} />
			</div>

			<div className={styles.otherMenu}>
				<MenuItems source={`/settings.svg`} name={'Settings'}/>
			</div>
			</div>
		</div>
	</div>
		</>
	)
}

export default Menu;