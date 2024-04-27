"use client"

import React, { useContext, useEffect, useState } from 'react';
import style from './Weather.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useWindowSize } from './../../hooks/useWindowSize';


export const Weather =() => {
	const { width, height } = useWindowSize();
	const [weather, setWeather] = useState(null);
	const [iconWeather, setIconWeather] = useState('/clear.svg')

	const fetchWeather = async () => {
		const arrWeather = ['Clouds', 'Clear', 'Atmosphere', 'Snow', 'Rain', 'Drizzle', 'Thunderstorm']
		try {
			
			const response = await fetch(`http://192.168.240.27:8087/weatherheader`);
			const data = await response.json();
			const temperatureCelsius = data.main.temp;
			const typeWeather =  data.weather[0].main

			switch(typeWeather) {
				case 'Clouds':
					setIconWeather('/clouds.svg')
					break;
				case 'Clear':
					setIconWeather('/clear.svg')
					break;
				case 'Atmosphere':
					setIconWeather('/atmosphere.svg')
					break;
				case 'Snow':
					setIconWeather('/snow.svg')
					break;
				case 'Rain':
					setIconWeather('/rain.svg')
					break;
				case 'Drizzle':
					setIconWeather('/drizzle.svg')
					break;
				case 'Thunderstorm':
					setIconWeather('/thunderstorm.svg')
					break;
			}

			setWeather(temperatureCelsius)
		} catch (error) {}
	};

	useEffect(() => {
		fetchWeather();
			const interval = setInterval(fetchWeather, 1000);
			
		return () => clearInterval(interval);
	}, []);



	return (
	    <>
				<Link href={`/weather`}>
	        <button className={style.blockHeader}>
	            <div className={style.img}>
	                    {width && width > 610 ? ( 
      <Image src={iconWeather} width={42} height={42} alt='Weather' draggable={false} />
    ) : (
      <Image src={iconWeather} width={30} height={30} alt='Weather' draggable={false} />
    )}
	            </div>
	            <div className={style.contenBlcok}>
	                {weather !== null ? (weather >= 0 ? `+${Math.round(weather)}°` : `${Math.round(weather)}°`) : 'Loading...'}
	            </div>
	        </button>
				</Link>
	    </>
	);
};