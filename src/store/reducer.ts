import { createReducer } from '@reduxjs/toolkit';
import {
	setActiveCity,
	fetchOffers,
	setSorting,
	setActiveOffer,
} from './actions';
import { CITIES } from '../const';
import { ServerOffer, City } from '../types/offer';
import mockOffers from '../mocks/offers';
import { Sorting } from '../types/sorting';

const initialState: {
	activeCity: City['name'];
	offers: ServerOffer[];
	activeOffer: ServerOffer | null;
	sorting: Sorting;
} = {
	activeCity: CITIES[0],
	offers: mockOffers,
	activeOffer: null,
	sorting: 'Popular',
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setActiveCity, (state, action) => {
			state.activeCity = action.payload;
		})
		.addCase(fetchOffers, (state) => {
			state.offers = mockOffers;
		})
		.addCase(setSorting, (state, action) => {
			state.sorting = action.payload;
		})
		.addCase(setActiveOffer, (state, action) => {
			state.activeOffer = action.payload;
		});
});

export { reducer };
