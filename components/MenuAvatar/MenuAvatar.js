
import styles from './MenuAvatar.module.css'
import Image from 'next/image';

export const MenuAvatar = () => {

	const name = 'Вячеслав'
	return (
		<>
			<div className={styles.avatarWrapper}>
				<div>
					<button className={styles.avatar}>
						<Image src={`/avatar.png`} width={100} height={100} alt='Avatar' draggable={false} priority={'high'} />
					</button>
				</div>
				
				<div className={styles.name}>{name}</div>
			</div>
		</>
	)
}
