import { createAction } from '@reduxjs/toolkit';
import { ServerLocation, City } from '../types/offer';

export const setActiveCity = createAction<City['name']>('offers/setActiveCity');
export const fetchOffers = createAction<ServerLocation[]>('offers/fetchOffers');
