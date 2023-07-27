import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import classNames from 'classnames';
import OfferCard from '../../components/offer-card/offer-card';
import { ServerOffer } from '../../types/offer';
import Header from '../../components/header/header';
import Map from '../../components/map/map';

type MainPageProps = {
	offers: ServerOffer[];
}

function MainPage({offers}: MainPageProps): JSX.Element {
	const offersByCities: Record<string, ServerOffer[]> = {};
	for (const offer of offers) {
		const city = offer.city.name;
		if (city in offersByCities) {
			offersByCities[city].push(offer);
			continue;
		}

		offersByCities[city] = [offer];
		continue;
	}

	const cities = Object.keys(offersByCities);
	const [activeCity, setActiveCity] = useState(cities[0]);
	const [activeOffer, setActiveOffer] = useState<ServerOffer | undefined>(undefined);

	const currentCity = offersByCities[activeCity];

	return (
		<div className="page page--gray page--main">
			<Helmet>
				<title>6 cities</title>
			</Helmet>
			<Header />
			<main className={classNames('page__main', 'page__main--index', {'page__main--index-empty': offers.length === 0})}>
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<ul className="locations__list tabs__list">
							{cities.map((cityName) => (
								<li className="locations__item" key={cityName}>
									<Link
										className={classNames(
											'locations__item-link',
											'tabs__item',
											{'tabs__item--active': cityName === activeCity},
										)}
										onClick={() => {
											setActiveCity(cityName);
										}}
										to="#"
									>
										<span>{cityName}</span>
									</Link>
								</li>
							))}
						</ul>
					</section>
				</div>
				<div className="cities">
					{offers.length > 0 ? (
						<div className="cities__places-container container">
							<section className="cities__places places">
								<h2 className="visually-hidden">Places</h2>
								<b className="places__found">{offersByCities[activeCity].length} places to stay in {activeCity}</b>
								<form className="places__sorting" action="#" method="get">
									<span className="places__sorting-caption">Sort by</span>{' '}
									<span className="places__sorting-type" tabIndex={0}>
										Popular
										<svg className="places__sorting-arrow" width={7} height={4}>
											<use xlinkHref="#icon-arrow-select" />
										</svg>
									</span>
									<ul className="places__options places__options--custom places__options--opened">
										<li
											className="places__option places__option--active"
											tabIndex={0}
										>
											Popular
										</li>
										<li className="places__option" tabIndex={0}>
											Price: low to high
										</li>
										<li className="places__option" tabIndex={0}>
											Price: high to low
										</li>
										<li className="places__option" tabIndex={0}>
											Top rated first
										</li>
									</ul>
								</form>
								<div className="cities__places-list places__list tabs__content">
									{offersByCities[activeCity].map((offer) => (
										<OfferCard {...offer} key={offer.id} onMouseEnter={() => setActiveOffer(offer)} onMouseLeave={() => setActiveOffer(undefined)} />
									))}
								</div>
							</section>
							<div className="cities__right-section">
								<Map city={currentCity[0].city} points={currentCity} activeOffer={activeOffer} />
							</div>
						</div>
					) : (
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
					)}
				</div>
			</main>
		</div>
	);
}

export default MainPage;
export type { MainPageProps };
