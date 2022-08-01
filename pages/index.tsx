import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Radar Violeta</title>
        <meta name="description" content="Guardián digítal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Radar Violeta</h1>

        <p className={styles.description}>
          Bienvenido a radar violeta tu guardián digítal en la Ciudad de México.
        </p>

        <div className={styles.grid}>
          <a
            href="https://turtle-v2-artifacts.s3.amazonaws.com/android/fe319862-2872-402b-92d3-95669ff3146e-564a52599b6f4d7da46dde097fac8944.apk"
            className={styles.card}
          >
            Demo Android
          </a>
          <div className={styles.cardIos}>Demo iOS (comming soon ...)</div>
        </div>
      </main>

      <footer className={styles.footer}>Powered by Dosware</footer>
    </div>
  );
};

export default Home;
