import { makeMockReviews } from '../../mocks/reviews';
import { fetchReviewsAction, sendReviewAction } from '../api-actions';
import { initialState, reviewsData } from './reviews-data';

describe('FavoritesData slice', () => {
	it('should return initial state with empty action', () => {
		const expectedState = initialState;
		const emptyAction = { type: '' };

		const result = reviewsData.reducer(initialState, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('should return default initial state with empty action and undefined state', () => {
		const expectedState = initialState;
		const emptyAction = { type: '' };

		const result = reviewsData.reducer(undefined, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('should set "isSuccessPost" to false with "resetSuccessPost" action', () => {
		const expectedState = {
			...initialState,
			isSuccessPost: false,
		};

		const result = reviewsData.reducer(
			undefined,
			reviewsData.actions.resetSuccessPost
		);

		expect(result).toEqual(expectedState);
	});

	it('should set "isReviewsLoading" to true with "fetchReviewsAction.pending"', () => {
		const expectedState = {
			...initialState,
			isReviewsLoading: true,
		};

		const result = reviewsData.reducer(undefined, fetchReviewsAction.pending);

		expect(result).toEqual(expectedState);
	});

	it('should set "reviews" to reviews array, "isReviewsLoading" to false with "fetchReviewsAction.fulfilled"', () => {
		const mockReviews = makeMockReviews;
		const expectedState = {
			...initialState,
			reviews: mockReviews,
			isReviewsLoading: false,
		};

		const result = reviewsData.reducer(
			undefined,
			fetchReviewsAction.fulfilled(mockReviews, '', '')
		);

		expect(result).toEqual(expectedState);
	});

	it('should set "isReviewSending" to true with "sendReviewAction.pending"', () => {
		const expectedState = {
			...initialState,
			isReviewSending: true,
		};

		const result = reviewsData.reducer(undefined, sendReviewAction.pending);

		expect(result).toEqual(expectedState);
	});

	it('should set "review" to reviews array, "isReviewSending" to false, "isSuccessPost" to true with "sendReviewAction.fulfilled"', () => {
		const mockReview = makeMockReviews[0];
		const expectedState = {
			...initialState,
			reviews: [mockReview],
			isReviewSending: false,
			isSuccessPost: true,
		};

		const result = reviewsData.reducer(
			undefined,
			sendReviewAction.fulfilled(mockReview, '', mockReview)
		);

		expect(result).toEqual(expectedState);
	});

	it('should set "isReviewSending" to false with "sendReviewAction.rejected"', () => {
		const expectedState = {
			...initialState,
			isReviewSending: false,
		};

		const result = reviewsData.reducer(undefined, sendReviewAction.rejected);

		expect(result).toEqual(expectedState);
	});
});
