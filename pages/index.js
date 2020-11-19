import Head from "next/head";
import styles from "../styles/Home.module.css";
import Lottie from "react-lottie";
import construction from "../public/lotties/construction.json";
import { defaultOptions } from "../const/lottieOptions";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | Adventure Works Cycle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>¡Bienvenido a Adventure Works Cycle!</h1>
        <p className={styles.description}>Sitio en construcción</p>
        <Lottie
          options={{
            ...defaultOptions,
            animationData: construction,
          }}
          height={"50%"}
          width={"50%"}
        />
      </main>
    </div>
  );
}
