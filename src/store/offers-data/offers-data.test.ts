import { CITIES } from '../../const';
import { makedMockOffers } from '../../mocks/offers';
import { fetchOffersAction } from '../api-actions';
import { initialState, offersData } from './offers-data';

describe('OffersData slice', () => {
	it('should return initial state with empty action', () => {
		const expectedState = initialState;
		const emptyAction = { type: '' };

		const result = offersData.reducer(initialState, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('should return default initial state with empty action and undefined state', () => {
		const expectedState = initialState;
		const emptyAction = { type: '' };

		const result = offersData.reducer(undefined, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('should set active city with "setActiveCity" action', () => {
		const expectedState = { ...initialState, activeCity: CITIES[1] };

		const result = offersData.reducer(
			initialState,
			offersData.actions.setActiveCity(CITIES[1])
		);

		expect(result).toEqual(expectedState);
	});

	it('should set sorting with "setSorting" action', () => {
		const expectedState = { ...initialState, sorting: 'Rating' };

		const result = offersData.reducer(
			initialState,
			offersData.actions.setSorting('Rating')
		);

		expect(result).toEqual(expectedState);
	});

	it('should set active offer with "setActiveOffer" action', () => {
		const mockOffer = makedMockOffers[0];
		const expectedState = { ...initialState, activeOffer: mockOffer };

		const result = offersData.reducer(
			initialState,
			offersData.actions.setActiveOffer(mockOffer)
		);

		expect(result).toEqual(expectedState);
	});

	it('should set "isOffersLoading" to "true", "hasError" to "false" with "fetchOffersAction.pending"', () => {
		const expectedState = initialState;

		const result = offersData.reducer(undefined, fetchOffersAction.pending);

		expect(result).toEqual(expectedState);
	});

	it('should set "offers" to array with offers, "isOffersLoading" to "false" with "fetchOffersAction.fulfilled"', () => {
		const mockOffers = makedMockOffers;
		const expectedState = {
			...initialState,
			offers: mockOffers,
			isOffersLoading: false,
		};

		const result = offersData.reducer(
			undefined,
			fetchOffersAction.fulfilled(mockOffers, '', undefined)
		);

		expect(result).toEqual(expectedState);
	});

	it('should set "isOffersLoading" to "false", "hasError" to "true" with "fetchOffersAction.rejected', () => {
		const expectedState = {
			...initialState,
			isOffersLoading: false,
			hasError: true,
		};

		const result = offersData.reducer(undefined, fetchOffersAction.rejected);

		expect(result).toEqual(expectedState);
	});
});
