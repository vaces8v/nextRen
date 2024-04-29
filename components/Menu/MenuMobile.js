'use client'

import styles from './MenuMobile.module.css';
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export const MenuMobile = ({ menuActiveState, weather }) => {
	const router = useRouter()
	const [active, setActive] = useState(false);
	const [hour, setHour] = useState('');
	const [minute, setMinute] = useState('');


	useEffect(() => {
		const interval = setInterval(() => {
			const currentDate = new Date()
			const currentHour = currentDate.getHours().toString().padStart(2, '0')
			const currentMinute = currentDate.getMinutes().toString().padStart(2, '0')
			setHour(currentHour)
			setMinute(currentMinute)
		}, 100)

		return () => clearInterval(interval)
	}, [])
	function handleMenuActive() {
		setActive(!active);
		menuActiveState(!active);
	}

	return (
		<button className={`${styles.button} ${active ? styles.active : ''}`}>
			<Image className={styles.openMenu} src={'/burger.svg'} width={50} height={50} alt={'menuOpen'} draggable={false} onClick={handleMenuActive} />
			<div className={styles.sectionMenu} style={{display: active ? 'flex' : 'none'}}>
				{/* <MenuAvatar /> */}
				<div className={styles.menuWrapper}>
					<div className={styles.mainMenu}>

						<div className={`${styles.btnMenu} ${styles.cross}`} onClick={handleMenuActive}>
							<span className={styles.spanButton}>Закрыть меню</span>
							<Image className={styles.closeMenu} src={'/cross.svg'} width={40} height={40} alt={'menuClose'} draggable={false} />
						</div>

						<div className={styles.btnMenu} onClick={() => router.push('/', '/', { shallow: true })}>
							<span className={styles.spanButton}>Расписание</span>
							<Image src={'/home.svg'} width={70} height={70} alt={'home'} draggable={false}/>
						</div>

						<div className={styles.btnMenu} onClick={() => router.push('/notfound', '/notfound', { shallow: true })}>
							<span className={styles.spanButton}>Уведомления</span>
							<Image src={`/bell.svg`} width={70} height={70} alt={'Bell'} draggable={false}/>
						</div>

						<div className={styles.btnMenu} onClick={() => router.push('/notfound', '/notfound', { shallow: true })}>
							<span className={styles.spanButton}>Задачи</span>
							<Image src={`/tasks.svg`} width={70} height={70} alt={'Tasks'} draggable={false}/>
						</div>

						<div className={styles.btnMenu} onClick={() => router.push('/notfound', '/notfound', { shallow: true })}>
							<span className={styles.spanButton}>Файловая система</span>
							<Image src={`/projects.svg`} width={70} height={70} alt={'Files'} draggable={false}/>
						</div>
					</div>

						<div className={styles.btnMenu} onClick={() => router.push('/notfound', '/notfound', { shallow: true })}>
							<span className={styles.spanButton}>Настройки</span>
							<Image src={`/settings.svg`} width={70} height={70} alt={'Settings'} draggable={false}/>
						</div>

					<div className={styles.btnMenu} onClick={() => router.push('/weather', '/weather', { shallow: true })}>
						{weather}
						<span className={styles.spanDate}>{ !hour && !minute ? '...' : `${hour}:${minute}`}</span>
					</div>

				</div>
			</div>
		</button>
	);
};