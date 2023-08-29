import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/utils';
import { AppRoute, AuthorizationStatus } from '../../const';
import App from './app';
import { makeMockFullOffer } from '../../mocks/offers';

describe('App Routing', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render "MainPage" when user navigate to "/"', () => {
		const withHistoryComponent = withHistory(<App />, mockHistory);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore()
		);
		mockHistory.push(AppRoute.Main);

		render(withStoreComponent);

		expect(screen.getByTestId('main-page')).toBeInTheDocument();
	});

	it('should render "LoginPage" when user navigate to "/login"', () => {
		const withHistoryComponent = withHistory(<App />, mockHistory);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore()
		);
		mockHistory.push(AppRoute.Login);

		render(withStoreComponent);

		expect(screen.getByTestId('login-page')).toBeInTheDocument();
	});

	it('should render "FavoritesPage" when user navigate to "/favorites"', () => {
		const initialState = {
			user: {
				authorizationStatus: AuthorizationStatus.Auth,
				userData: null,
			},
		};
		const withHistoryComponent = withHistory(<App />, mockHistory);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore(initialState)
		);
		mockHistory.push(AppRoute.Favorites);

		render(withStoreComponent);

		expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
	});

	it('should render "OfferPage" when user navigate to "/offer/offerId"', () => {
		const mockOffer = makeMockFullOffer;
		const initialState = {
			offer: {
				fullOffer: mockOffer,
				nearby: [],
				isFullOfferLoading: false,
				isNearbyLoading: false,
				hasErrorOfferLoading: false,
			},
		};
		const withHistoryComponent = withHistory(<App />, mockHistory);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore(initialState)
		);
		mockHistory.push(`${AppRoute.Offer}/${mockOffer.id}`);

		render(withStoreComponent);

		expect(screen.getByTestId('offer-page')).toBeInTheDocument();
	});

	it('should render "NotFoundPage" when user navigate to non-exist route', () => {
		const withHistoryComponent = withHistory(<App />, mockHistory);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore()
		);
		const unknownRoute = '/not-exist-route';
		mockHistory.push(unknownRoute);

		render(withStoreComponent);

		expect(screen.getByText('Error 404. Page not found.')).toBeInTheDocument();
	});
});
