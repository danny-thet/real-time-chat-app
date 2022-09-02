import type { NextPage } from "next";
import { ChatMain } from "../components/ChatMain";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	return (
		<main className={styles.main}>
			<ChatMain />
		</main>
	);
};

export default Home;
