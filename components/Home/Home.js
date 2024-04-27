import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading } from './../Loading/Loading';
import { useRouter } from 'next/router';

export const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [scheduleData, setScheduleData] = useState([]);
    const router = useRouter();

    useEffect(() => {

        const initialFetchData = async () => {
            try {
                const response = await axios.get('http://192.168.240.27:8087/currentWeek');
                localStorage.setItem('scheduleData', JSON.stringify(response.data));
								router.push(`/home/${response.data.weekNumber}`);
								localStorage.setItem('currentWeek', JSON.stringify(response.data.weekNumber))
            } catch (error) {
                console.log('Ошибка при загрузке расписания', error);
                setLoading(true);
            }
        };

        initialFetchData();
    }, []);

    
    if (loading) {
        return <Loading />;
    }

    return (
				<></>
    );
};