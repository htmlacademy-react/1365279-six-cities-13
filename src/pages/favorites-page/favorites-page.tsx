import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { ServerOffer } from '../../mocks/offers';
import FavoritesOfferCard from '../../components/favorites-offer-card/favorites-offer-card';

type FavoritesPageProps = {
	offers: ServerOffer[];
}

function FavoritesPage({offers}: FavoritesPageProps): JSX.Element {
	const favoritesOffers = offers.slice(0, 10);
	const favoritesOffersByCities: Record<string, ServerOffer[]> = {};
	for (const offer of favoritesOffers) {
		const city = offer.city.name;
		if (city in favoritesOffersByCities) {
			favoritesOffersByCities[city].push(offer);
			continue;
		}

		favoritesOffersByCities[city] = [offer];
		continue;
	}

	const cities = Object.keys(favoritesOffersByCities);

	return (
		<div className="page">
			<Helmet>
				<title>6 cities - Favorites</title>
			</Helmet>
			<Header />
			<main className="page__main page__main--favorites">
				<div className="page__favorites-container container">
					<section className="favorites">
						<h1 className="favorites__title">Saved listing</h1>
						<ul className="favorites__list">
							{cities.map((cityName) => (
								<li className="favorites__locations-items" key={cityName}>
									<div className="favorites__locations locations locations--current">
										<div className="locations__item">
											<Link className="locations__item-link" to="#">
												<span>{cityName}</span>
											</Link>
										</div>
									</div>
									<div className="favorites__places">
										{favoritesOffersByCities[cityName].map((offer) => (
											<FavoritesOfferCard {...offer} key={offer.id} />
										))}
									</div>
								</li>
							))}
						</ul>
					</section>
				</div>
			</main>
			<Footer />
		</div>

	);
}

export default FavoritesPage;
