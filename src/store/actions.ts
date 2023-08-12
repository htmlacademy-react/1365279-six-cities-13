import { createAction } from '@reduxjs/toolkit';
import { ServerLocation, City, ServerOffer } from '../types/offer';
import { Sorting } from '../types/sorting';

export const setActiveCity = createAction<City['name']>('offers/setActiveCity');
export const fetchOffers = createAction<ServerLocation[]>('offers/fetchOffers');
export const setActiveOffer = createAction<ServerOffer | null>(
	'offers/setActiveOffer'
);
export const setSorting = createAction<Sorting>('offers/setSorting');
