import { createReducer } from '@reduxjs/toolkit';
import {
	setActiveCity,
	setSorting,
	setActiveOffer,
	loadOffers,
	setOffersLoadingStatus,
	requireAuthorization,
} from './actions';
import { AuthorizationStatus, CITIES } from '../const';
import { City, ServerOffer } from '../types/offer';
import { Sorting } from '../types/sorting';

const initialState: {
	authorizationStatus: AuthorizationStatus;
	activeCity: City['name'];
	offers: ServerOffer[];
	isOffersLoading: boolean;
	activeOffer: ServerOffer | null;
	sorting: Sorting;
	error: string | null;
} = {
	authorizationStatus: AuthorizationStatus.Unknown,
	activeCity: CITIES[0],
	offers: [],
	isOffersLoading: true,
	activeOffer: null,
	sorting: 'Popular',
	error: null,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(loadOffers, (state, action) => {
			state.offers = action.payload;
		})
		.addCase(setOffersLoadingStatus, (state, action) => {
			state.isOffersLoading = action.payload;
		})
		.addCase(setActiveCity, (state, action) => {
			state.activeCity = action.payload;
		})
		.addCase(setSorting, (state, action) => {
			state.sorting = action.payload;
		})
		.addCase(setActiveOffer, (state, action) => {
			state.activeOffer = action.payload;
		})
		.addCase(requireAuthorization, (state, action) => {
			state.authorizationStatus = action.payload;
		});
});

export { reducer };
