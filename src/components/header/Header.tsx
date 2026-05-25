import { NavLink } from 'react-router';

import logo from '~/app/assets/img/logo.webp';

import { ThemeToggle } from '../theme-toggle';
import styles from './Header.module.css';

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.headerContainer}>
      <nav className={styles.nav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <img src={logo} alt="Logotype Rick & Morty" width="200" height="61" />
      <ThemeToggle />
    </div>
  </header>
);
