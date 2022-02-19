import styles from './styles.module.scss';

const NotFound = () => {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.wrapper}>
          <h1 className={styles.error}>404 error</h1>
          <p className={styles.msg}>Oh, you seem to be lost ...</p>
          <button className={styles.link}>home</button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
