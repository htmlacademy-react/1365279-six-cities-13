import { render, screen } from '@testing-library/react';
import MainPage from './main-page.tsx';
import { withHistory, withStore } from '../../mocks/mock-component.tsx';
import { initialState as initialOffersState } from '../../store/offers-data/offers-data.ts';
import { initialState as initialFavoritesState } from '../../store/favorites-data/favorites-data.ts';
import { makedMockOffers } from '../../mocks/offers.ts';
import { makeFakeStore } from '../../mocks/utils.ts';

describe('Component: MainPage', () => {
	const mockOffers = makedMockOffers;
	const loadingScreenElementId = 'loading-spinner';

	it('should render correctly with already loaded offers', () => {
		const initialState = {
			offers: {
				...initialOffersState,
				offers: mockOffers,
				isOffersLoading: false,
			},
			favorites: {
				...initialFavoritesState,
				isFavoritesLoading: false,
			},
		};
		const { withStoreComponent } = withStore(
			<MainPage />,
			makeFakeStore(initialState)
		);
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);

		expect(screen.getByTestId('main-page')).toBeInTheDocument();
	});

	it('should render loading screen when offers is loading', () => {
		const initialState = {
			offers: {
				...initialOffersState,
				offers: mockOffers,
				isOffersLoading: true,
			},
			favorites: {
				...initialFavoritesState,
				isFavoritesLoading: true,
			},
		};
		const { withStoreComponent } = withStore(
			<MainPage />,
			makeFakeStore(initialState)
		);
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);

		expect(screen.getByTestId(loadingScreenElementId)).toBeInTheDocument();
	});

	it('should return main empty page when offers not found', () => {
		const expectedStatus = 'No places to stay available';
		const initialState = {
			offers: {
				...initialOffersState,
				offers: [],
				isOffersLoading: false,
			},
			favorites: {
				...initialFavoritesState,
				isFavoritesLoading: false,
			},
		};
		const { withStoreComponent } = withStore(
			<MainPage />,
			makeFakeStore(initialState)
		);
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);

		expect(screen.getByText(expectedStatus)).toBeInTheDocument();
	});
});
