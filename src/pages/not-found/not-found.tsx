import {Link} from 'react-router-dom';
import styles from './not-found.module.css';

function NotFound() : JSX.Element {
	return (
		<div className="page page--gray">
			<header className="header">
				<div className="container">
					<div className="header__wrapper">
						<div className="header__left">
							<a className="header__logo-link header__logo-link--active">
								<img
									className="header__logo"
									src="img/logo.svg"
									alt="6 cities logo"
									width={81}
									height={41}
								/>
							</a>
						</div>
					</div>
				</div>
			</header>
			<div className='container'>
				<h1>Ошибка 404. Страница не существует.</h1>
				<Link to="/" className={styles.link}>Вернуться на главную</Link>
			</div>
		</div>
	);
}

export default NotFound;
