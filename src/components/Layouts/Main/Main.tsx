import { Outlet } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import styles from './Main.module.css';

const Public = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Public;
