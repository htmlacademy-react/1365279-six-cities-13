import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PrivateRoute, PublicRoute } from '../access-route/access-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import mockReviews from '../../mocks/reviews';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-page/loading-page';

function App(): JSX.Element {
	const isOffersLoading = useAppSelector((state) => state.isOffersLoading);

	if (isOffersLoading) {
		return (
			<LoadingScreen />
		);
	}

	return (
		<HelmetProvider>
			<BrowserRouter>
				<Routes>
					<Route path={AppRoute.Main} element={<MainPage />} />
					<Route
						path={AppRoute.Login}
						element={
							<PublicRoute status={AuthorizationStatus.NoAuth}>
								<LoginPage />
							</PublicRoute>
						}
					/>
					<Route
						path={AppRoute.Favorites}
						element={
							<PrivateRoute status={AuthorizationStatus.Auth}>
								<FavoritesPage />
							</PrivateRoute>
						}
					/>
					<Route
						path={`${AppRoute.Offer}/:offerId`}
						element={<OfferPage reviews={mockReviews} />}
					/>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	);
}

export default App;
