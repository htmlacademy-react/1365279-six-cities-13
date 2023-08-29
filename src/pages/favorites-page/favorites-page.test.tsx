import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component.tsx';
import FavoritesPage from './favorites-page.tsx';
import { makeMockOffers } from '../../mocks/offers.ts';
import { initialState as initialUserState } from '../../store/user-process/user-process.ts';
import { initialState as initialFavoritesState } from '../../store/favorites-data/favorites-data.ts';
import { AuthorizationStatus } from '../../const.ts';
import { makeFakeStore } from '../../mocks/utils.ts';


describe('Component: FavoritesPage', () => {
	const favoritesPageElementId = 'FavoritesPage';
	const mockFavoriteOffer = makeMockOffers[0];

	it('should return page with offers when favorites not empty and favorite offers is already loaded', () => {
		const initialState = {
			favorites: {
				...initialFavoritesState,
				favorites: [mockFavoriteOffer],
				isFavoritesLoading: false,
			},
			user: {
				...initialUserState,
				authorizationStatus: AuthorizationStatus.Auth,
			},
		};
		const { withStoreComponent } = withStore(<FavoritesPage />, makeFakeStore(initialState));
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);

		expect(screen.getByTestId(favoritesPageElementId)).toBeInTheDocument();
	});

	it('should return loading screen when favoriteOffersLoading is loading', () => {
		const initialState = {
			favorites: {
				...initialFavoritesState,
				favorites: [mockFavoriteOffer],
				isFavoritesLoading: true,
			},
			user: {
				...initialUserState,
				authorizationStatus: AuthorizationStatus.Auth,
			},
		};
		const { withStoreComponent } = withStore(<FavoritesPage />, makeFakeStore(initialState));
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);

		expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();
	});

	it('should return empty favorite page when favorites empty', () => {
		const initialState = {
			favorites: {
				...initialFavoritesState,
				favorites: [],
				isFavoritesLoading: false,
			},
			user: {
				...initialUserState,
				authorizationStatus: AuthorizationStatus.Auth,
			},
		};
		const { withStoreComponent } = withStore(<FavoritesPage />, makeFakeStore(initialState));
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);

		expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
	});
});
