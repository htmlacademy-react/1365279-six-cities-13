import { ServerOffer } from '../../types/offer';
import { Link } from 'react-router-dom';
import OfferCard from '../offer-card/offer-card';

type FavoritesOffersProps = {
	favoritesOffers: ServerOffer[];
};

export function FavoritesOffers({ favoritesOffers }: FavoritesOffersProps) {
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
								<OfferCard block={'favorites'} {...offer} key={offer.id} />
							))}
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
