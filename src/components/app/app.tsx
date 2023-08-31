import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { getErrorStatus } from '../../store/offers-data/selector';
import { ErrorPage } from '../../pages/error-page/error-page';
import LoadingPage from '../../pages/loading-page/loading-page';
import PublicRoute from '../public-route/public-route';

function App(): JSX.Element {
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const hasError = useAppSelector(getErrorStatus);

	if (hasError) {
		return <ErrorPage />;
	}

	if (authorizationStatus === AuthorizationStatus.Unknown) {
		return <LoadingPage />;
	}

	return (
		<HelmetProvider>
			<Routes>
				<Route path={AppRoute.Main} element={<MainPage />} />
				<Route
					path={AppRoute.Login}
					element={
						<PublicRoute authorizationStatus={authorizationStatus}>
							<LoginPage />
						</PublicRoute>
					}
				/>
				<Route
					path={AppRoute.Favorites}
					element={
						<PrivateRoute authorizationStatus={authorizationStatus}>
							<FavoritesPage />
						</PrivateRoute>
					}
				/>
				<Route path={`${AppRoute.Offer}/:offerId`} element={<OfferPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</HelmetProvider>
	);
}

export default App;
