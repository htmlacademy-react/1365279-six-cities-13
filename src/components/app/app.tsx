import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PrivateRoute, PublicRoute } from '../access-route/access-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import type { MainPageProps } from '../../pages/main-page/main-page';
import { AppRoute, AuthorizationStatus } from '../../const';

type AppProps = MainPageProps;

function App({offersCount}: AppProps): JSX.Element {
	return (
		<HelmetProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path={AppRoute.Root}
						element={<MainPage offersCount={offersCount} />}
					/>
					<Route
						path={AppRoute.Login}
						element={
							<PublicRoute
								status={AuthorizationStatus.NoAuth}
							>
								<LoginPage />
							</PublicRoute>
						}
					/>
					<Route
						path={AppRoute.Favorites}
						element={
							<PrivateRoute
								status={AuthorizationStatus.NoAuth}
							>
								<FavoritesPage />
							</PrivateRoute>
						}
					/>
					<Route
						path={`${AppRoute.Offer}/:offerId`}
						element={<OfferPage />}
					/>
					<Route
						path='*'
						element={<NotFoundPage />}
					/>
				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	);
}

export default App;
