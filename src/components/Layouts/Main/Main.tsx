import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import styles from './Main.module.css';

export default function Main() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
