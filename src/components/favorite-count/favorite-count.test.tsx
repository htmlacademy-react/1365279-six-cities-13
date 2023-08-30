import { render, screen } from '@testing-library/react';
import { FavoriteCount } from './favorite-count';
import { withStore } from '../../mocks/mock-component';
import { extractActionsTypes, makeFakeStore } from '../../mocks/utils';
import { makedMockOffers } from '../../mocks/offers';
import { fetchFavoritesAction } from '../../store/api-actions';
import { APIRoute } from '../../const';

describe('Component: FavoriteCount', () => {
	it('should render correct', () => {
		const mockFavorites = makedMockOffers;
		const initialStore = {
			favorites: {
				favorites: mockFavorites,
				isIdle: false,
				isFavoritesLoading: false,
			},
		};
		const { withStoreComponent } = withStore(
			<FavoriteCount />,
			makeFakeStore(initialStore)
		);
		render(withStoreComponent);

		expect(screen.getByText(mockFavorites.length)).toBeInTheDocument();
	});

	it('should dispatch "fetchFavoritesAction.pending" when component render first time', () => {
		const mockFavorites = makedMockOffers;
		const initialStore = {
			favorites: {
				favorites: [],
				isIdle: true,
				isFavoritesLoading: false,
			},
		};
		const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
			<FavoriteCount />,
			makeFakeStore(initialStore)
		);
		mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockFavorites);

		render(withStoreComponent);
		const actions = extractActionsTypes(mockStore.getActions());

		expect(actions).toEqual([fetchFavoritesAction.pending.type]);
	});
});
