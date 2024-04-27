'use client'

import Head from "next/head";
import { Poppins } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Menu } from '../../components/Menu/Menu';
import { WeatherPage } from './../../components/WeatherPage/WeatherPage';

const poppins = Poppins({ subsets: ["latin"], weight: '600' });

export default function Weather() {
  return (
    <>
			<WeatherPage/>
    </>
  );
}
