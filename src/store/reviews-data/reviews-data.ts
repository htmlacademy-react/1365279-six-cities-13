import { createSlice } from '@reduxjs/toolkit';
import { ReviewsData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchReviewsAction, sendReviewAction } from '../api-actions';

export const initialState: ReviewsData = {
	reviews: [],
	isReviewsLoading: false,
	isReviewSending: false,
	isSuccessPost: false,
	hasErrorReviewsLoading: false,
};

export const reviewsData = createSlice({
	name: NameSpace.Reviews,
	initialState,
	reducers: {
		resetSuccessPost(state) {
			state.isSuccessPost = false;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchReviewsAction.pending, (state) => {
				state.isReviewsLoading = true;
				state.hasErrorReviewsLoading = false;
			})
			.addCase(fetchReviewsAction.fulfilled, (state, action) => {
				state.reviews = action.payload;
				state.isReviewsLoading = false;
			})
			.addCase(fetchReviewsAction.rejected, (state) => {
				state.isReviewsLoading = false;
				state.hasErrorReviewsLoading = true;
			})
			.addCase(sendReviewAction.pending, (state) => {
				state.isReviewSending = true;
			})
			.addCase(sendReviewAction.fulfilled, (state, action) => {
				state.reviews.push(action.payload);
				state.isReviewSending = false;
				state.isSuccessPost = true;
			})
			.addCase(sendReviewAction.rejected, (state) => {
				state.isReviewSending = false;
			});
	},
});
