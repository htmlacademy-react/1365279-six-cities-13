import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './not-found-page.module.css';
import Header from '../../components/header/header';

function NotFoundPage() : JSX.Element {
	return (
		<div className="page page--gray">
			<Helmet>
				<title>6 cities - Not Found</title>
			</Helmet>
			<Header withNavigation={false} />
			<div className='container'>
				<h1>Ошибка 404. Страница не существует.</h1>
				<Link to="/" className={styles.link}>Вернуться на главную</Link>
			</div>
		</div>
	);
}

export default NotFoundPage;
