import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './../../../components/Home/Home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Day } from './../../../components/Day/Day';
import { Loading } from './../../../components/Loading/Loading';
import { useSwipeable } from 'react-swipeable';

export default function WeekDynamic() {
    const [loading, setLoading] = useState(true);
    const [scheduleData, setScheduleData] = useState([]);
    const [periodWeek, setPeriodWeek] = useState(null);
    const [typeWeek, setTypeWeek] = useState(null);
    const [numberWeek, setNumberWeek] = useState('');
    const router = useRouter();
    const { weekNum } = router.query;

    useEffect(() => {
        const fetchData = async (weekNumber) => {
            try {
                const response = await axios.get(`http://192.168.240.27:8087/week/number/${weekNumber}`);
                localStorage.setItem('scheduleData', JSON.stringify(response.data));
                setScheduleData(response.data.days);
                setLoading(false);
                const currWeek = await localStorage.getItem('currentWeek')
                setPeriodWeek(JSON.parse(currWeek))
                setNumberWeek(response.data.weekNumber);
                setTypeWeek(response.data.weekNumber);
            } catch (error) {
                console.log('Ошибка при загрузке расписания', error);
                setLoading(true);
            }
        };

        if (numberWeek !== weekNum) {
            fetchData(weekNum);
        }
    }, [weekNum]);


    useEffect(() => {
        const currWeek = JSON.parse(localStorage.getItem('currentWeek'));
        setPeriodWeek(currWeek);
        if(weekNum >= 52) {
            router.push(`/home/${1}`);
        }
        if(weekNum <= 0) {
            router.push(`/home/${52}`);
        }
    }, [weekNum, numberWeek]);

    function formatDay(day) {
        return day < 10 ? `0${day}` : `${day}`;
    }

    function isCurrentWeek() {
        if (weekNum == periodWeek) {
            return 'Текущая неделя';
        } else {
            const data = JSON.parse(localStorage.getItem('scheduleData'));
            const dayFirst = new Date(data.days[0].date);
            const dayLast = new Date(data.days[6].date);
            const formattedDayFirst = `${formatDay(dayFirst.getDate())}.${formatDay(dayFirst.getMonth() + 1)}`;
            const formattedDayLast = `${formatDay(dayLast.getDate())}.${formatDay(dayLast.getMonth() + 1)}`;
            return `${formattedDayFirst}-${formattedDayLast}`;
        }
    }

    function tWeek() {
        return typeWeek % 2 === 0 ? 'Четная' : 'Нечетная';
    }

    const handleBack = () => {
        router.push(`/home/${numberWeek - 1}`);
    };

    const handleNext = () => {
        router.push(`/home/${numberWeek + 1}`);
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handleBack()
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <div {...swipeHandlers} className={styles.homepage}>
            <div className={styles.pagination}>
                <div className={styles.currentDate}>{ isCurrentWeek()}</div>
                <div className={styles.typeOfWeek}>{tWeek()}</div>
                <div className={styles.numberOfWeek}>{numberWeek}-ая неделя</div>
                <div className={styles.btns}>
                    <button className={styles.back} onClick={handleBack}>
                        <Image src={'/arrLeft.svg'} width={90} height={65} draggable={false} alt='backBtn' />
                    </button>
                    <button className={styles.next} onClick={handleNext}>
                        <Image src={'/arrRight.svg'} width={90} height={65} draggable={false} alt='nextBtn'/>
                    </button>
                </div>
            </div>
            {scheduleData && scheduleData.slice(0, 6).map((dayData) => (
                <Day key={dayData._id} day={dayData} />
            ))}
        </div>
    );
}