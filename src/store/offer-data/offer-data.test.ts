import { makeMockFullOffer, makeMockOffers } from '../../mocks/offers';
import { fetchFullOfferAction, fetchNearbyAction } from '../api-actions';
import { initialState, offerData } from './offer-data';

describe('OfferData slice', () => {
	it('should return initial state with empty action', () => {
		const expectedState = initialState;
		const emptyAction = { type: '' };

		const result = offerData.reducer(initialState, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('should return default initial state with empty action and undefined state', () => {
		const expectedState = initialState;
		const emptyAction = { type: '' };

		const result = offerData.reducer(undefined, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('should set "isFullOfferLoading" to true, "hasErrorOfferLoading" to false with "fetchFullOfferAction.pending"', () => {
		const expectedState = {
			...initialState,
			isFullOfferLoading: true,
			hasErrorOfferLoading: false,
		};

		const result = offerData.reducer(undefined, fetchFullOfferAction.pending);

		expect(result).toEqual(expectedState);
	});

	it('should set offer to fullOffer, "isFullOfferLoading" to false with "fetchFullOfferAction.fulfilled"', () => {
		const mockFullOffer = makeMockFullOffer;
		const expectedState = {
			...initialState,
			isFullOfferLoading: false,
			fullOffer: mockFullOffer,
		};

		const result = offerData.reducer(
			undefined,
			fetchFullOfferAction.fulfilled(mockFullOffer, '', '')
		);

		expect(result).toEqual(expectedState);
	});

	it('should set "isFullOfferLoading" to false, "hasErrorOfferLoading" to true with "fetchFullOfferAction.rejected"', () => {
		const expectedState = {
			...initialState,
			isFullOfferLoading: false,
			hasErrorOfferLoading: true,
		};

		const result = offerData.reducer(undefined, fetchFullOfferAction.rejected);

		expect(result).toEqual(expectedState);
	});

	it('should set "isNearbyLoading" to true with "fetchNearbyAction.pending"', () => {
		const expectedState = {
			...initialState,
			isNearbyLoading: true,
		};

		const result = offerData.reducer(undefined, fetchNearbyAction.pending);

		expect(result).toEqual(expectedState);
	});

	it('should set nearby offers to nearby array, "isNearbyLoading" to false with "fetchNearbyAction.fulfilled"', () => {
		const mockNearbyOffers = makeMockOffers;
		const expectedState = {
			...initialState,
			isFullOfferLoading: false,
			nearby: mockNearbyOffers,
		};

		const result = offerData.reducer(
			undefined,
			fetchNearbyAction.fulfilled(mockNearbyOffers, '', '')
		);

		expect(result).toEqual(expectedState);
	});
});
