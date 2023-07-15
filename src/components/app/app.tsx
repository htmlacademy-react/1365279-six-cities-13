import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import type { MainProps } from '../../pages/main/main';
import { AppRoute } from '../../const';

type AppProps = MainProps;

function App({offersCount}: AppProps): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={AppRoute.Root}
					element={<Main offersCount={offersCount} />}
				/>
				<Route
					path={AppRoute.Login}
					element={<Login />}
				/>
				<Route
					path={AppRoute.Favorites}
					element={<Favorites />}
				/>
				<Route
					path={`${AppRoute.Offer}/:offerd`}
					element={<Offer />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
