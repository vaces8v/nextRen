import React, { useEffect, useState } from 'react';
import styles from './WeatherPage.module.css';
import Image from 'next/image';
import axios from 'axios';
import { Loading } from "../Loading/Loading";

export const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchWeatherFuture = async () => {
        try {
            const url = "http://192.168.240.27:8087/weatherpage";
            const data = (await axios.get(url)).data;
            setLoading(false);
            const forecastData = data.list.slice(0, 24).map((item, index) => ({
                temperature: item.main.temp - 273.15,
                weather: item.weather[0].main,
                description: item.weather[0].description,
                icon: getIconForWeather(item.weather[0].main),
                date: getFormattedDateForIndex(index),
                dateformat: getDateFormatForIndex(index),
            }));

            setWeatherData(forecastData);
        } catch (error) {
            setLoading(true);
            console.error('Error fetching weather data:', error);
        }
    };

		const getIconForWeather = (weather) => {
			switch (weather) {
				case "Clouds":
					return "./clouds.svg";
				case "Clear":
					return "./clear.svg";
				case "Atmosphere":
					return "./atmosphere.svg";
				case "Snow":
					return "./snow.svg";
				case "Rain":
					return "./rain.svg";
				case "Drizzle":
					return "./drizzle.svg";
				case "Thunderstorm":
					return "./thunderstorm.svg";
				default:
					return "";
			}
		};

    const getFormattedDateForIndex = (index) => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

        let currentDayIndex = dayOfWeek + index;
        if (currentDayIndex >= 7) {
            currentDayIndex -= 7;
        }

        if (index === 0) {
            return "Сегодня";
        } else if (index === 1) {
            return "Завтра";
        } else {
            return days[currentDayIndex];
        }
    };

		const getDateFormatForIndex = (index) => {
		    const today = new Date();
		    today.setDate(today.getDate() + index);
		
		    const day = String(today.getDate()).padStart(2, "0");
		    const month = String(today.getMonth() + 1).padStart(2, "0");
		
		    return `${day}.${month}`;
		};

    useEffect(() => {
        fetchWeatherFuture();
        const interval = setInterval(fetchWeatherFuture, 3600000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className={styles.mainTitle}>Погода в КМПО</div>
            {weatherData && (
                <div className={styles.blockWeather}>
                    <div className={styles.fullDay}>
                        {weatherData.map((item, index) => (
                            <div key={index} className={styles.itemWeather}>
                                <div className={styles.weatherItem}>
                                    <div className={styles.formatedDate}>{item.dateformat}</div>
                                    <div className={styles.date}>{item.date}</div>
                                    <div className={styles.img}>
                                        {item.icon && (
                                            <Image
                                                src={item.icon}
                                                alt={item.weather}
                                                property="high"
                                                draggable={false}
                                                width={100}
                                                height={100}
                                            />
                                        )}
                                    </div>
                                    <div className={styles.temp}>
                                        {item.temperature >= 0 ? '+' : ''}{item.temperature.toFixed(0)}°C
                                    </div>
                                    <div className={styles.description}>
                                        {item.description.charAt(0).toUpperCase() + item.description.slice(1)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};