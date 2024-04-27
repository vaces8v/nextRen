'use client'
import Link from 'next/link';
import styles from './MenuItems.module.css'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const MenuItems = ({source, name, fun}) => {
	const router = useRouter();
	const [page, setPage] = useState('/')

	useEffect(() => {
		switch(name) {
			case 'Home': 
				setPage('/')
				break;
			case 'Weather': 
				setPage('/weather')
				break;
			default:
				setPage('/notfound')
				break;
		}
	}, [router.pathname])

	const handleComponent = (e) => {
    e.preventDefault();
    router.push(page, page, { shallow: true });
  };

	return (
		<>
			<button className={styles.menuitem} onClick={handleComponent}>
						<Image src={source} className={styles.image} width={70} height={70} priority="high" alt={`${name}`} name={name} draggable={false} onClick={fun}  />
			</button>
		</>
	)
}
