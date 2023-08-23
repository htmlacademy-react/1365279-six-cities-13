import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/favorites-data/selector';
import { FavoritesOffers } from '../../components/favorites-offers/favorites-offers';
import { FavoritesEmpty } from '../../components/favorites-empty/favorites-empty';

function FavoritesPage(): JSX.Element {
	const favoritesOffers = useAppSelector(getFavorites);
	return (
		<div className="page">
			<Helmet>
				<title>6 cities - Favorites</title>
			</Helmet>
			<Header />
			<main className="page__main page__main--favorites">
				<div className="page__favorites-container container">
					{favoritesOffers.length > 0 ? (
						<FavoritesOffers favoritesOffers={favoritesOffers} />
					) : (
						<FavoritesEmpty />
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default FavoritesPage;
