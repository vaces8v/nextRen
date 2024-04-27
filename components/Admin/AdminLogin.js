'use client'

import styles from "./Admin.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '../store/store'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";

const AdminLogin = () => {
	  const router = useRouter();
    const dispatch = useDispatch();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const token = useSelector((state) => state.auth.token);

		useEffect(() => {
			if(token) {
				router.push('/panel')
			}
		},[])

		useEffect(() => {
			if(token) {
				router.push('/panel')
			}
		},[token])

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8087/auth/login', {
                email: email,
                password: password
            });
            const { token, name } = response.data;

            dispatch(setToken(token));
            dispatch(setUser(name));
        } catch (error) {
            console.error(error);
        }
    };

    function getEmail(event) {
        setEmail(event.target.value);
    }

    function getPassword(event) {
        setPassword(event.target.value);
    }

	return (
			<div className={styles.admininterface}>
			<from className={styles.form}>
					<div className={styles.title}>Admin</div>
					<input type="email" className={styles.email} placeholder='email' onChange={getEmail}/>
					<input type="password" className={styles.password} min={5} placeholder='password' onChange={getPassword}/>
					<div className={styles.sectionButtuns}>
						<div className={styles.forgot}>Забыл пароль</div>
						<button type='submit' className={styles.submit} onClick={handleLogin}>Отправить</button>
					</div>
			</from>
			</div>
	)
}

export default AdminLogin;