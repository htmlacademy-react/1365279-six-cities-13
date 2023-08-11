import { createAction } from '@reduxjs/toolkit';
import { City, ServerOffer } from '../types/offer';
import { Sorting } from '../types/sorting';

export const loadOffers = createAction<ServerOffer[]>('offers/loadOffers');
export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');
export const setActiveCity = createAction<City['name']>('offers/setActiveCity');
export const setActiveOffer = createAction<ServerOffer | null>(
	'offers/setActiveOffer'
);
export const setSorting = createAction<Sorting>('offers/setSorting');
