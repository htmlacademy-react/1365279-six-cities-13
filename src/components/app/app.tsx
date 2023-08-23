import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PrivateRoute, PublicRoute } from '../access-route/access-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus } from '../../store/user-process/selector';

function App(): JSX.Element {
	const authorizationStatus = useAppSelector(getAuthorizationStatus);

	return (
		<HelmetProvider>
			<HistoryRouter history={browserHistory}>
				<Routes>
					<Route path={AppRoute.Main} element={<MainPage />} />
					<Route
						path={AppRoute.Login}
						element={
							<PublicRoute status={authorizationStatus}>
								<LoginPage />
							</PublicRoute>
						}
					/>
					<Route
						path={AppRoute.Favorites}
						element={
							<PrivateRoute status={authorizationStatus}>
								<FavoritesPage />
							</PrivateRoute>
						}
					/>
					<Route path={`${AppRoute.Offer}/:offerId`} element={<OfferPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</HistoryRouter>
		</HelmetProvider>
	);
}

export default App;
