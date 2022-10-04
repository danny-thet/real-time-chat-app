import { NextPage } from "next";
import React from "react";
import { Login } from "../components/Login";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	return (
		<main className={styles.main}>
			<Login />
		</main>
	);
};
export default Home;
