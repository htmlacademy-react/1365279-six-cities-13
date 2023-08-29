import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';
import styles from './error-page.module.css';

export function ErrorPage(): JSX.Element {
	const dispatch = useAppDispatch();

	return (
		<div className="page page--gray container">
			<h1>Oops! Something went wrong.</h1>
			<button
				onClick={() => {
					dispatch(fetchOffersAction());
				}}
				className={`button ${styles.button}`}
				type="button"
			>
				Try again
			</button>
		</div>
	);
}
