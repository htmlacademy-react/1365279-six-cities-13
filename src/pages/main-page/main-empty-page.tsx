import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';

function MainEmpty() : JSX.Element {
	return(
		<div className="page page--gray page--main">
			<Helmet>
				<title>6 cities</title>
			</Helmet>
			<Header />
			<main className="page__main page__main--index page__main--index-empty">
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<ul className="locations__list tabs__list">
							<li className="locations__item">
								<Link className="locations__item-link tabs__item" to="#">
									<span>Paris</span>
								</Link>
							</li>
							<li className="locations__item">
								<Link className="locations__item-link tabs__item" to="#">
									<span>Cologne</span>
								</Link>
							</li>
							<li className="locations__item">
								<Link className="locations__item-link tabs__item" to="#">
									<span>Brussels</span>
								</Link>
							</li>
							<li className="locations__item">
								<Link className="locations__item-link tabs__item" to="#">
									<span>Amsterdam</span>
								</Link>
							</li>
							<li className="locations__item">
								<Link className="locations__item-link tabs__item" to="#">
									<span>Hamburg</span>
								</Link>
							</li>
							<li className="locations__item">
								<Link
									className="locations__item-link tabs__item tabs__item--active"
									to="#"
								>
									<span>Dusseldorf</span>
								</Link>
							</li>
						</ul>
					</section>
				</div>
				<div className="cities">
					<div className="cities__places-container cities__places-container--empty container">
						<section className="cities__no-places">
							<div className="cities__status-wrapper tabs__content">
								<b className="cities__status">No places to stay available</b>
								<p className="cities__status-description">
									We could not find any property available at the moment in
									Dusseldorf
								</p>
							</div>
						</section>
						<div className="cities__right-section" />
					</div>
				</div>
			</main>
		</div>
	);
}

export default MainEmpty;