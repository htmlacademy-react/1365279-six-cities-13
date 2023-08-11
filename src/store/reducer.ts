import { createReducer } from '@reduxjs/toolkit';
import {
	setActiveCity,
	setSorting,
	setActiveOffer,
	loadOffers,
} from './actions';
import { CITIES } from '../const';
import { City, ServerOffer } from '../types/offer';
import { Sorting } from '../types/sorting';

const initialState: {
	activeCity: City['name'];
	offers: ServerOffer[];
	activeOffer: ServerOffer | null;
	sorting: Sorting;
} = {
	activeCity: CITIES[0],
	offers: [],
	activeOffer: null,
	sorting: 'Popular',
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setActiveCity, (state, action) => {
			state.activeCity = action.payload;
		})
		.addCase(setSorting, (state, action) => {
			state.sorting = action.payload;
		})
		.addCase(setActiveOffer, (state, action) => {
			state.activeOffer = action.payload;
		})
		.addCase(loadOffers, (state, action) => {
			state.offers = action.payload;
		});
});

export { reducer };
