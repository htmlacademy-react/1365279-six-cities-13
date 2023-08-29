import { makeMockOffers } from '../../mocks/offers';
import {
	addFavoriteAction,
	deleteFavoriteAction,
	fetchFavoritesAction,
} from '../api-actions';
import { favoritesData, initialState } from './favorites-data';

describe('FavoritesData slice', () => {
	it('should return initial state with empty action', () => {
		const expectedState = initialState;
		const emptyAction = { type: '' };

		const result = favoritesData.reducer(initialState, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('should return default initial state with empty action and undefined state', () => {
		const expectedState = initialState;
		const emptyAction = { type: '' };

		const result = favoritesData.reducer(undefined, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('should set "isFavoritesLoading" to true, "isIdle" to false with "fetchFavoritesAction.pending"', () => {
		const expectedState = {
			...initialState,
			isFavoritesLoading: true,
			isIdle: false,
		};

		const result = favoritesData.reducer(
			undefined,
			fetchFavoritesAction.pending
		);

		expect(result).toEqual(expectedState);
	});

	it('should set "favorites" to array, "isFavoritesLoading" to false with "fetchFavoritesAction.fulfilled"', () => {
		const mockFavorites = makeMockOffers;
		const expectedState = {
			...initialState,
			favorites: mockFavorites,
			isFavoritesLoading: false,
		};

		const result = favoritesData.reducer(
			undefined,
			fetchFavoritesAction.fulfilled(mockFavorites, '', undefined)
		);

		expect(result).toEqual(expectedState);
	});

	it('should set "isFavoritesLoading" to false with "fetchFavoritesAction.rejected"', () => {
		const expectedState = {
			...initialState,
			isFavoritesLoading: false,
		};

		const result = favoritesData.reducer(
			undefined,
			fetchFavoritesAction.rejected
		);

		expect(result).toEqual(expectedState);
	});

	it('should add favorite offer to favorites with "addFavoriteAction.fulfilled"', () => {
		const mockFavorite = makeMockOffers[0];
		const expectedState = {
			...initialState,
			favorites: [mockFavorite],
		};

		const result = favoritesData.reducer(
			undefined,
			addFavoriteAction.fulfilled(mockFavorite, '', '')
		);

		expect(result).toEqual(expectedState);
	});

	it('should delete favorite offer from favorites with "deleteFavoriteAction.fulfilled"', () => {
		const mockFavorite = makeMockOffers[0];
		const mockInitialState = {
			...initialState,
			favorites: [mockFavorite],
		};
		const expectedState = initialState;

		const result = favoritesData.reducer(
			mockInitialState,
			deleteFavoriteAction.fulfilled(mockFavorite, '', '')
		);

		expect(result).toEqual(expectedState);
	});
});
