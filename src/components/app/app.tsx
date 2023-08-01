import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PrivateRoute, PublicRoute } from '../access-route/access-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import mockOffers from '../../mocks/offers';
import mockReviews from '../../mocks/reviews';


function App(): JSX.Element {
	return (
		<HelmetProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path={AppRoute.Main}
						element={<MainPage offers={mockOffers} />}
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
								status={AuthorizationStatus.Auth}
							>
								<FavoritesPage offers={mockOffers} />
							</PrivateRoute>
						}
					/>
					<Route
						path={`${AppRoute.Offer}/:offerId`}
						element={<OfferPage reviews={mockReviews} />}
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
