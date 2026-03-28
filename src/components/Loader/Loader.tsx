import styles from './Loader.module.scss';

export const Loader = () => {
	return (
		<div className={styles.loadContainer}>
			<div className={styles.spinner}></div>
			<p>Загрузка...</p>
		</div>
	)
}