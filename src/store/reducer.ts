import { createReducer } from '@reduxjs/toolkit';
import {
	setActiveCity,
	setSorting,
	setActiveOffer,
	loadOffers,
	setOffersLoadingStatus,
	requireAuthorization,
	loadFullOffer,
	setFullOfferLoadingStatus,
} from './actions';
import { AuthorizationStatus, CITIES } from '../const';
import { City, FullOffer, ServerOffer } from '../types/offer';
import { Sorting } from '../types/sorting';

const initialState: {
	authorizationStatus: AuthorizationStatus;
	activeCity: City['name'];
	offers: ServerOffer[];
	fullOffer: FullOffer | null;
	isOffersLoading: boolean;
	isFullOfferLoading: boolean;
	activeOffer: ServerOffer | null;
	sorting: Sorting;
} = {
	authorizationStatus: AuthorizationStatus.Unknown,
	activeCity: CITIES[0],
	offers: [],
	fullOffer: null,
	isOffersLoading: true,
	isFullOfferLoading: true,
	activeOffer: null,
	sorting: 'Popular',
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(loadOffers, (state, action) => {
			state.offers = action.payload;
		})
		.addCase(loadFullOffer, (state, action) => {
			state.fullOffer = action.payload;
		})
		.addCase(setOffersLoadingStatus, (state, action) => {
			state.isOffersLoading = action.payload;
		})
		.addCase(setFullOfferLoadingStatus, (state, action) => {
			state.isFullOfferLoading = action.payload;
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
