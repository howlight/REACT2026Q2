import { NavLink } from 'react-router';

import styles from './Header.module.css';

export const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  </header>
);
