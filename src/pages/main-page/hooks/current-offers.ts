import { useAppSelector } from '../../../hooks';
import { ServerOffer } from '../../../types/offer';

export function useCurrentOffers() {
	const offers = useAppSelector((state) => state.offers);
	const activeCity = useAppSelector((state) => state.activeCity);
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

	const currentOffers = offersByCities[activeCity];

	return { currentOffers, activeCity };
}
