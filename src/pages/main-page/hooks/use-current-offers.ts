import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getActiveCity, getOffers } from '../../../store/offers-data/selector';
import { ServerOffer } from '../../../types/offer';
import { fetchOffersAction } from '../../../store/api-actions';
import { offersActions } from '../../../store/offers-data/offers-data';

export function useCurrentOffers() {
	const dispatch = useAppDispatch();
	dispatch(offersActions.setActiveOffer(null));
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

	useEffect(() => {
		dispatch(fetchOffersAction());
	}, [dispatch]);

	return { currentOffers, activeCity };
}
