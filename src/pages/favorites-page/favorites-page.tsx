import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { ServerOffer } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/favorites-data/selector';
import OfferCard from '../../components/offer-card/offer-card';

function FavoritesPage(): JSX.Element {
	const favoritesOffers = useAppSelector(getFavorites);
	const favoritesOffersByCities: Record<string, ServerOffer[]> = {};
	for (const offer of favoritesOffers) {
		const city: string = offer.city.name;
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
											<OfferCard favorite {...offer} key={offer.id} />
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
