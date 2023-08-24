import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import { CitiesList } from '../../components/cities-list/cities-list';
import { useCurrentOffers } from './hooks/current-offers';
import { SortingForm } from '../../components/sorting-form/sorting-form';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import { AuthorizationStatus, MapTypes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffersLoadingStatus } from '../../store/offers-data/selector';
import LoadingScreen from '../loading-page/loading-page';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { useEffect } from 'react';
import { fetchOffersAction } from '../../store/api-actions';
import { getFavoritesLoadingStatus } from '../../store/favorites-data/selector';
import { MainPageEmpty } from './main-page-empty';
import { offersActions } from '../../store/offers-data/offers-data';

function MainPage(): JSX.Element {
	const { currentOffers, activeCity } = useCurrentOffers();
	const isOffersLoading = useAppSelector(getOffersLoadingStatus);
	const isFavoritesLoading = useAppSelector(getFavoritesLoadingStatus);
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchOffersAction());
		dispatch(offersActions.setActiveOffer(null));
	}, [dispatch]);

	if (
		isOffersLoading ||
		isFavoritesLoading ||
		authorizationStatus === AuthorizationStatus.Unknown
	) {
		return <LoadingScreen />;
	}

	return (
		<div className="page page--gray page--main">
			<Helmet>
				<title>6 cities</title>
			</Helmet>
			<Header />
			<main
				className={classNames('page__main', 'page__main--index', {
					'page__main--index-empty': !currentOffers,
				})}
			>
				<h1 className="visually-hidden">Cities</h1>
				<CitiesList />
				<div className="cities">
					<div
						className={classNames('cities__places-container', 'container', {
							'cities__places-container--empty': !currentOffers,
						})}
					>
						{currentOffers ? (
							<>
								<section className="cities__places places">
									<h2 className="visually-hidden">Places</h2>
									<b className="places__found">
										{currentOffers.length} place
										{currentOffers.length > 1 && 's'} to stay in {activeCity}
									</b>
									<SortingForm />
									<OffersList currentOffers={currentOffers} />
								</section>
								<div className="cities__right-section">
									<LeafletMap
										city={currentOffers[0].city}
										points={currentOffers}
										block={MapTypes.Cities}
									/>
								</div>
							</>
						) : (
							<MainPageEmpty activeCity={activeCity} />
						)}
					</div>
				</div>
			</main>
		</div>
	);
}

export default MainPage;
