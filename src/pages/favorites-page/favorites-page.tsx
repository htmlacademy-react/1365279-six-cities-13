import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';
import {
	getFavorites,
	getFavoritesLoadingStatus,
} from '../../store/favorites-data/selector';
import { FavoritesOffers } from '../../components/favorites-offers/favorites-offers';
import LoadingScreen from '../loading-page/loading-page';
import { FavoritesPageEmpty } from '../favorites-page-empty/favorites-page-empty';
import classNames from 'classnames';

function FavoritesPage(): JSX.Element {
	const favoritesOffers = useAppSelector(getFavorites);
	const isFavoriteLoading = useAppSelector(getFavoritesLoadingStatus);

	if (isFavoriteLoading) {
		return <LoadingScreen />;
	}

	return (
		<div className={classNames('page', {'page--favorites-empty': !favoritesOffers.length})}>
			<Helmet>
				<title>6 cities - Favorites</title>
			</Helmet>
			<Header />
			<main
				className={classNames('page__main', 'page__main--favorites', {
					'page__main--favorites-empty': !favoritesOffers.length,
				})}
			>
				<div className="page__favorites-container container">
					{favoritesOffers.length > 0 ? (
						<FavoritesOffers favoritesOffers={favoritesOffers} />
					) : (
						<FavoritesPageEmpty />
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default FavoritesPage;
