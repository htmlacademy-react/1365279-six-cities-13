import styles from './loading-page.module.css';

function LoadingScreen(): JSX.Element {
	return (
		<div className={styles.wrap}>
			<div className={styles.spinner}></div>
		</div>
	);
}

export default LoadingScreen;
