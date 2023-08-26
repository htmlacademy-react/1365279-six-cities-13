import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './not-found-page.module.css';
import Header from '../../components/header/header';

function NotFoundPage(): JSX.Element {
	return (
		<div className="page page--gray">
			<Helmet>
				<title>6 cities - Not Found</title>
			</Helmet>
			<Header withNavigation={false} />
			<div className="container">
				<h1>Error 404. Page not found.</h1>
				<Link to="/" className={styles.link}>
					Go to main page
				</Link>
			</div>
		</div>
	);
}

export default NotFoundPage;
