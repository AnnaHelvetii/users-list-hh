import styles from './ErrorMessage.module.scss';

interface Props {
	message?: string;
	onRetry?: () => void;
}

export const ErrorMessage = ({ message = "Произошла ошибка", onRetry }: Props) => (
	<div className={styles.errorContainer}>
		<div className={styles.errorIcon}>!</div>
		<h3>Упс! Что-то пошло не так</h3>
		<p>{message}</p>
		{onRetry && (
			<button onClick={onRetry} className={styles.retryBtn}>
				Попробовать снова
			</button>
		)}
	</div>
);
