import { Link } from 'react-router-dom';
import styles from './error-offer-page.module.css';

export function ErrorOfferPage(): JSX.Element {
	return (
		<div className="page page--gray container">
			<h1>Oops! Something went wrong.</h1>
			<Link to="/" className={styles.link}>
				Go to main page
			</Link>
		</div>
	);
}
