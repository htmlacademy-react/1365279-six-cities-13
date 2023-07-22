import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import classNames from 'classnames';
import OfferCard from '../../components/offer-card/offer-card';
import { ServerOffer } from '../../mocks/offers';
import Header from '../../components/header/header';

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
	const [activeOffer, setActiveOffer] = useState<ServerOffer | null>(null);

	return (
		<div className="page page--gray page--main">
			<Helmet>
				<title>6 cities</title>
			</Helmet>
			<Header />
			<main className="page__main page__main--index">
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<ul className="locations__list tabs__list">
							{cities.map((city) => (
								<li className="locations__item" key={city}>
									<Link
										className={classNames(
											'locations__item-link',
											'tabs__item',
											{'tabs__item--active': city === activeCity},
										)}
										onClick={() => {
											setActiveCity(city);
										}}
										to="#"
									>
										<span>{city}</span>
									</Link>
								</li>
							))}
						</ul>
					</section>
				</div>
				<div className="cities">
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
									<OfferCard {...offer} key={offer.id} onMouseEnter={() => setActiveOffer(offer)} />
								))}
							</div>
						</section>
						<div className="cities__right-section">
							<section className="cities__map map" />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default MainPage;
export type { MainPageProps };
