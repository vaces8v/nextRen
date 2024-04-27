"use client"

import React, { useState, useEffect } from 'react';
import styles from './Day.module.css';
import { Plan } from './../Plan/Plan';


export const Day = ({ day }) => {
    const [dayOfWeek, setDayOfWeek] = useState('');
		const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        switch (new Date(day.date).getDay()) {
            case 1: setDayOfWeek('Понедельник'); break;
            case 2: setDayOfWeek('Вторник'); break;
            case 3: setDayOfWeek('Среда'); break;
            case 4: setDayOfWeek('Четверг'); break;
            case 5: setDayOfWeek('Пятница'); break;
            case 6: setDayOfWeek('Суббота'); break;
            default: setDayOfWeek('');
        }
        const date = new Date(day.date);
        const formattedDateString = `${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}`;
        setFormattedDate(formattedDateString);
    }, [day.date]);

		const allLessonsAreNotImportant = day.lessons.every((lesson) => !lesson[0].importance);

    if (allLessonsAreNotImportant) {
        return null;
    }

    return (
        <div className={styles.blockDay}>
            <div className={styles.blockHeader}>
                <div className={styles.day}>{dayOfWeek}</div>
                <div className={styles.date}>{formattedDate}</div>
            </div>

            <div className={styles.styleMain}>
                <div className={styles.schedule}>
                    {day.lessons.map((lesson, index) => (
											lesson[0].importance &&
  											(<Plan
                            key={index}
                            num={lesson[0].num}
                            time={lesson[0].time}
                            title={lesson[0].title}
                            teacher={lesson[0].teacher}
                            office={lesson[0].office}
                            homework={lesson[0].homework}
                        />)
                    ))}
                </div>
            </div>
            
        </div>
    );
};