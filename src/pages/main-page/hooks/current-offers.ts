import { useAppSelector } from '../../../hooks';
import { getActiveCity, getOffers } from '../../../store/offers-data/selector';
import { ServerOffer } from '../../../types/offer';

export function useCurrentOffers() {
	const offers = useAppSelector(getOffers);
	const activeCity = useAppSelector(getActiveCity);
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
