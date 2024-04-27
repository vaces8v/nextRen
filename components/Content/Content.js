"use client"

import { useState, useEffect } from 'react';
import styles from './Content.module.css'
import { HeaderBlocks } from './../HeaderBlocks/HeaderBlocks';
import { TimeDate } from './../HeaderBlocks/TimeDate/TimeDate';
import { Weather } from './../HeaderBlocks/Weather/Weather';
import { Menu } from './../Menu/Menu';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Media from 'react-media';
import { MenuMobile } from '../Menu/MenuMobile';

export const Content = ({ children }) => {

	const router = useRouter();
	const [title, setTitle] = useState('Расписание')

	useEffect(() => {
		switch(router.pathname) {
			case '/':
				setTitle('Расписание')
			break;
			case '/weather':
				setTitle('Погода')
			break;
			case '/admin':
				setTitle('Админ панель')
			break;
			case '/admin/panel':
				setTitle('Админ панель')
			break;
		}
	}, [router.pathname])

    return (
				<>
				<Head>
        	<title>Ren</title>
        	<meta name="description" content="Ren app" />
        	<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" sizes="32x32"/>
      	</Head>
					<main className={styles.main}>
      		  <div className={styles.wrapper}>
							<div className={styles.wrapperContent}>
      		      <div className={styles.blocksHeader}>
      		          <div className={styles.sectLeft}>
      		              <HeaderBlocks title={title}/>
      		          </div>
      		          <div className={styles.sectRight}>
      		              <TimeDate /> <Weather />
      		          </div>
      		      </div>
      		      <div className={styles.backgroundContent}>
      		          <div className={styles.scrollBlock}>
      		              <div className={styles.contenDays}>
													{children}
												</div>
      		          </div>
      		      </div>
      		  </div>
							<div>
									<Media query={{ maxWidth: 900 }} defaultMatches>
										{matches => (matches ? <></> : <Menu />)}
									</Media>
							</div>
						</div>
						</main>
				</>
    );
};