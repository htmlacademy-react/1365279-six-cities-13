import { createSlice } from '@reduxjs/toolkit';
import { OfferData } from '../../types/state';
import { NameSpace } from '../../const';
import {
	fetchFullOfferAction,
	fetchNearbyAction,
	fetchReviewsAction,
	sendReviewAction,
} from '../api-actions';

const initialState: OfferData = {
	fullOffer: null,
	reviews: [],
	nearby: [],
	isFullOfferLoading: false,
	isReviewsLoading: false,
	isNearbyLoading: false,
	isReviewSending: false,
	hasErrorOfferLoading: false,
	hasErrorSubmit: false,
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
			.addCase(fetchReviewsAction.pending, (state) => {
				state.isReviewsLoading = true;
			})
			.addCase(fetchReviewsAction.fulfilled, (state, action) => {
				state.reviews = action.payload;
				state.isReviewsLoading = false;
			})
			.addCase(fetchNearbyAction.pending, (state) => {
				state.isNearbyLoading = true;
			})
			.addCase(fetchNearbyAction.fulfilled, (state, action) => {
				state.nearby = action.payload;
				state.isNearbyLoading = false;
			})
			.addCase(sendReviewAction.pending, (state) => {
				state.isReviewSending = true;
				state.hasErrorSubmit = false;
			})
			.addCase(sendReviewAction.fulfilled, (state, action) => {
				state.reviews.push(action.payload);
				state.isReviewSending = false;
			})
			.addCase(sendReviewAction.rejected, (state) => {
				state.isReviewSending = false;
				state.hasErrorSubmit = true;
			});
	},
});
