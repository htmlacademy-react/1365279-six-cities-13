import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import { ServerOffer } from '../../types/offer';
import { Cities } from '../../const';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import { useAppSelector } from '../../hooks';
import { CitiesList } from '../../components/cities-list/cities-list';

type MainPageProps = {
	offers: ServerOffer[];
};

function MainPage(): JSX.Element {
	const offers = useAppSelector((state) => state.offers);
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

	const cities = [];
	cities.push(...Object.keys(Cities));
	const activeCity = useAppSelector((state) => state.activeCity);
	const currentOffers = offersByCities[activeCity];

	return (
		<div className="page page--gray page--main">
			<Helmet>
				<title>6 cities</title>
			</Helmet>
			<Header />
			<main
				className={classNames('page__main', 'page__main--index', {
					'page__main--index-empty': !currentOffers,
				})}
			>
				<h1 className="visually-hidden">Cities</h1>
				<CitiesList cities={cities} activeCity={activeCity} />
				<div className="cities">
					{currentOffers ? (
						<OffersList currentOffers={currentOffers} activeCity={activeCity} />
					) : (
						<div className="cities__places-container cities__places-container--empty container">
							<section className="cities__no-places">
								<div className="cities__status-wrapper tabs__content">
									<b className="cities__status">No places to stay available</b>
									<p className="cities__status-description">
										We could not find any property available at the moment in{' '}
										{activeCity}
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
