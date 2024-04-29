import { useEffect, useState } from 'react';
import styles from './Plan.module.css';
import Image from 'next/image';
import { useWindowSize } from '../hooks/useWindowSize';

export const Plan = ({ num, time, title, teacher, office, homework }) => {
    const [checker, setChecker] = useState('./accept.svg');
    const [active, setActive] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [containerHeight, setContainerHeight] = useState('70px');
    const [mobTeacther, setMobTeacther] = useState(true)
    const { width } = useWindowSize();

    function toggleActive() {
        setActive(!active);
        setExpanded(!expanded);
    }

    useEffect(() => {
        setChecker(homework ? '/accept.svg' : '/refuse.svg');
    }, [homework]);

    useEffect(() => {
        function handleResize() {
            if (width <= 726) {
                setContainerHeight(expanded ? 'auto' : '84px');
            } else if (width <= 610) {
                setContainerHeight(expanded ? 'auto' : '50px');
            } else {
                setContainerHeight(expanded ? 'auto' : '100px');
            }
        }

        handleResize();
    }, [width, expanded]);

    return (
        <div className={styles.mainPlan}>
            <button className={styles.btnPlan} onClick={toggleActive}>
                <div className={`${styles.maincontainer} ${active ? styles.active : ''}`} style={{ height: containerHeight }}>
                    <div className={styles.plan}>
                        <div className={styles.num}>{num}</div>
                        <div className={styles.time}>{time}</div>
                        <div className={styles.learn}>{title}</div>
                        {width > 610 ? (<>
                                <div className={styles.containerTeacher}>
                                    <div className={styles.headerTecher}>
                                        <div className={styles.labelTeacher}>Преподователь</div>
                                        <div className={styles.hw}>
                                            <div className={styles.titleWork}>ДЗ</div>
                                            <Image src={checker} width={20} height={20} alt="Cheker" loading="lazy" draggable={false} />
                                        </div>
                                    </div>
                                    <div className={styles.teacher}>{teacher}</div>
                                </div>
                                <div className={styles.office}>{office}</div>
                            </>)
                            :
                            <div className={styles.hw}>
                                <div className={styles.titleWork}>ДЗ</div>
                                <Image src={checker} width={20} height={20} alt="Cheker" loading="lazy" draggable={false} />
                            </div>}
                    </div>
                    {expanded && (
                        <>
                            {width <= 610 && (<>
                                <div className={styles.containerTeacher}>
                                    <div className={styles.headerTecher}>
                                        <div className={styles.labelTeacher}>Преподователь:</div>
                                        <div className={styles.teacher}>{teacher}</div>
                                    </div>
                                </div>
                                <div className={styles.office}>{`Кабинет: ${office}`}</div>
                            </>)}
                            <div className={styles.moreinfo}>
                                <div className={styles.homeworkTitle}>Домашнее задание: </div>
                                {homework ? <div className={styles.homework}>{homework}</div> : <div className={styles.homework}>-</div>}
                            </div>
                        </>
                    )}
                </div>
            </button>
        </div>
    );
};