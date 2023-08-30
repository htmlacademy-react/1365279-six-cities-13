import { render, screen } from '@testing-library/react';
import { FavoritesOffers } from './favorites-offers';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makedMockOffers } from '../../mocks/offers';
import { makeFakeStore } from '../../mocks/utils';

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
		const withHistoryComponent = withHistory(
			<FavoritesOffers favoritesOffers={mockFavorites} />
		);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore(initialStore)
		);

		render(withStoreComponent);

		expect(screen.getByText('Saved listing')).toBeInTheDocument();
		expect(screen.getAllByTestId('location-link')[0]).toBeInTheDocument();
	});
});
