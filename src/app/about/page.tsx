import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <h1>About</h1>

      <p>
        Author:{' '}
        <a href="https://github.com/howlight" target="_blank" rel="noreferrer">
          Howlight
        </a>
      </p>

      <a href="https://rs.school/courses/reactjs" target="_blank" rel="noreferrer">
        RS School React Course
      </a>
    </div>
  );
}
