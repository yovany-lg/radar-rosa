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
            href="https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40yovany.lg/radar-rosa-app-0f559d4dc5a84e158b676a889ff70dd0-signed.apk"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
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
