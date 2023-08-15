import { createAction } from '@reduxjs/toolkit';
import { City, ServerOffer, FullOffer } from '../types/offer';
import { Sorting } from '../types/sorting';
import { AppRoute, AuthorizationStatus } from '../const';

export const loadOffers = createAction<ServerOffer[]>('offers/loadOffers');
export const loadFullOffer = createAction<FullOffer>('offers/loadFullOffer');
export const setOffersLoadingStatus = createAction<boolean>(
	'data/setOffersLoadingStatus'
);
export const setFullOfferLoadingStatus = createAction<boolean>(
	'data/setFullOfferLoadingStatus'
);
export const setActiveCity = createAction<City['name']>('offers/setActiveCity');
export const setActiveOffer = createAction<ServerOffer | null>(
	'offers/setActiveOffer'
);
export const setSorting = createAction<Sorting>('offers/setSorting');
export const requireAuthorization = createAction<AuthorizationStatus>(
	'user/requireAuthorization'
);
export const redirectToRoute = createAction<AppRoute>('offer/redirectToRoute');
