'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Panel.module.css';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export const AdminPanel = () => {
	const router = useRouter()
	const token = useSelector((state) => state.auth.token);
	const [showModal, setShowModal] = useState(false)

  const [lessonsData, setLessonsData] = useState({
    _id: '',
    date: '',
    lessons: [],
    __v: 0
  });
	const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date.split('-').reverse().reverse().join('-'));
  };

  useEffect(() => {
    if(!selectedDate) {
			return
		};
		fetchLesson()
  }, [selectedDate]);

  const fetchLesson = async () => {
    try {
      const response = await axios.get(`http://localhost:8087/day/${selectedDate}`);
      setLessonsData(response.data); 
    } catch (error) {
      console.error('Ошибка при загрузке данных урока', error);
    }
  };

  const handleInputChange = (index, property, value) => {
    const updatedLessons = [...lessonsData.lessons];
    updatedLessons[index][0][property] = value;
    setLessonsData({ ...lessonsData, lessons: updatedLessons });
  };

  const handleCheckboxChange = (index, checked) => {
    const updatedLessons = [...lessonsData.lessons];
    updatedLessons[index][0]['importance'] = checked;
    setLessonsData({ ...lessonsData, lessons: updatedLessons });
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put(`http://localhost:8087/day/${selectedDate}`, lessonsData);
			setShowModal(true);
			setTimeout(() => {
					setShowModal(false);
			}, 3000);
    } catch (error) {
      console.error('Ошибка при обновлении данных уроков', error);
    }
  };

useEffect(() => {
		if (!token) {
		router.push('/admin')
	}
}, [])

  return (
    <div className={styles.mainChange}>
		<div className={styles.title}>Редактор расписания</div>
			<input type='date' className={styles.date} onChange={handleDateChange}/>
			<div className={styles.section} >
      {selectedDate && lessonsData.lessons.map((lesson, index) => (
        <div key={index} className={styles.sectionLesson}>
          <div className={styles.num}>{index + 1} пара</div>
					<input 
            className={styles.input}
            value={lesson[0].num}
            onChange={(e) => handleInputChange(index, 'num', (index + 1))}
            placeholder="Номер пары"
          />
					<input 
            className={styles.input}
            value={lesson[0].time}
            onChange={(e) => handleInputChange(index, 'time', e.target.value)}
            placeholder="Время проведения"
          />
          <input 
            className={styles.input}
            type="text"
            value={lesson[0].title}
            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
            placeholder="Название пары"
          />
          <input 
            className={styles.input}
            value={lesson[0].teacher}
            onChange={(e) => handleInputChange(index, 'teacher', e.target.value)}
            placeholder="Преподаватель"
          />
          <input 
            className={styles.input}
            value={lesson[0].office}
            onChange={(e) => handleInputChange(index, 'office', e.target.value)}
            placeholder="Аудитория"
          />
          <textarea 
            className={cn(styles.input, styles.textarea)}
            value={lesson[0].homework}
            onChange={(e) => handleInputChange(index, 'homework', e.target.value)}
            placeholder="Домашнее задание"
          />
				<div>
					  <input
            className={styles.checkbox}
            type="checkbox"
            checked={lesson[0].importance || false}
            onChange={(e) => handleCheckboxChange(index, e.target.checked)}
          />
          <label htmlFor={`lesson${index}`}>Отоброжать</label>
				</div>
        </div>
      ))}
			{selectedDate && <button onClick={handleFormSubmit} className={styles.submit}>Сохранить</button>}
				</div>
				    {showModal && (
                <div className={cn(styles.modal, showModal && styles.fade)}>
                    <div className={styles.modalContent}>
                        <p className={styles.textModal}>Данные успешно сохранены</p>
                    </div>	
                </div>
            )}
    </div>
  );
};