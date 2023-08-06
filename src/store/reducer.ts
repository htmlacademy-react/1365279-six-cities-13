import { createReducer } from '@reduxjs/toolkit';
import { setActiveCity, fetchOffers } from './actions';
import { CITIES } from '../const';
import { ServerOffer, City } from '../types/offer';
import mockOffers from '../mocks/offers';

const initialState: {
	activeCity: City['name'];
	offers: ServerOffer[];
} = {
	activeCity: CITIES[0],
	offers: mockOffers,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setActiveCity, (state, action) => {
			state.activeCity = action.payload;
		})
		.addCase(fetchOffers, (state) => {
			state.offers = mockOffers;
		});
});

export { reducer };
