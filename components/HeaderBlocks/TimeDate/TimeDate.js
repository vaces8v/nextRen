'use client'

import { useEffect, useState } from 'react'
import style from './TimeDate.module.css'

export const TimeDate = () => {
const [hour, setHour] = useState('');
const [minute, setMinute] = useState('');
const [dateCurrent, setDateCurrent] = useState('')

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
const currentDate = new Date(); 
const currentDay = days[currentDate.getDay()];


useEffect(() => {
    const interval = setInterval(() => {
        const currentDate = new Date()
        const currentHour = currentDate.getHours().toString().padStart(2, '0')
        const currentMinute = currentDate.getMinutes().toString().padStart(2, '0')
        setHour(currentHour)
        setMinute(currentMinute)

				switch (currentDay) {
					case 'Sunday': 
						setDateCurrent('Воскресенье')
						break;
					case 'Monday': 
						setDateCurrent('Понедельник')
						break;
					case 'Tuesday': 
						setDateCurrent('Вторник')
						break;
					case 'Wednesday': 
						setDateCurrent('Среда')
						break;
					case 'Thursday': 
						setDateCurrent('Четверг')
						break;
					case 'Friday': 
						setDateCurrent('Пятница')
						break;
					case 'Saturday': 
						setDateCurrent('Суббота')
						break;
					default:
						setDateCurrent('Loading...')
						break;
				}
    }, 100)

    return () => clearInterval(interval)
}, [])

	return (
		<>
			<div className={style.blockHeader}>
				<div className={style.time}>
            { !hour && !minute ? 'Загрузка...' : `${hour}:${minute}`}
				</div>
				<div className={style.noneLine}>---</div>
				<div className={style.contenBlcok}>{dateCurrent}</div>
			</div>
		</>
	)
}
