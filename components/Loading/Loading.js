"use client"

import styles from './Loading.module.css'
import { useEffect, useState } from 'react';

export const Loading = () => {
	
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots.length >= 3) {
                    return ''; 
                } else {
                    return prevDots + '.'; 
                }
            });
        }, 200); 

        return () => clearInterval(interval); 
    }, []);

	return(
		<>
			<div className={styles.badConnect}>
				<p>Загрузка{dots}</p>
			</div>
		</>
	)
}