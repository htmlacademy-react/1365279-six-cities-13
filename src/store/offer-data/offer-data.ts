import { createSlice } from '@reduxjs/toolkit';
import { OfferData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchFullOfferAction, fetchNearbyAction } from '../api-actions';

export const initialState: OfferData = {
	fullOffer: null,
	nearby: [],
	isFullOfferLoading: false,
	isNearbyLoading: false,
	hasErrorOfferLoading: false,
};

export const offerData = createSlice({
	name: NameSpace.Offer,
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchFullOfferAction.pending, (state) => {
				state.isFullOfferLoading = true;
				state.hasErrorOfferLoading = false;
			})
			.addCase(fetchFullOfferAction.fulfilled, (state, action) => {
				state.fullOffer = action.payload;
				state.isFullOfferLoading = false;
			})
			.addCase(fetchFullOfferAction.rejected, (state) => {
				state.isFullOfferLoading = false;
				state.hasErrorOfferLoading = true;
			})
			.addCase(fetchNearbyAction.pending, (state) => {
				state.isNearbyLoading = true;
			})
			.addCase(fetchNearbyAction.fulfilled, (state, action) => {
				state.nearby = action.payload;
				state.isNearbyLoading = false;
			});
	},
});
