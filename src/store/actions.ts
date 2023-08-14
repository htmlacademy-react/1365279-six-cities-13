import { createAction } from '@reduxjs/toolkit';
import { City, ServerOffer } from '../types/offer';
import { Sorting } from '../types/sorting';
import { AuthorizationStatus } from '../const';

export const loadOffers = createAction<ServerOffer[]>('offers/loadOffers');
export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');
export const setActiveCity = createAction<City['name']>('offers/setActiveCity');
export const setActiveOffer = createAction<ServerOffer | null>(
	'offers/setActiveOffer'
);
export const setSorting = createAction<Sorting>('offers/setSorting');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string | null>('offer/setError');
