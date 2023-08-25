import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { ServerOffer } from '../../types/offer';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import { OfferCardMemo } from '../../components/offer-card/offer-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { offersActions } from '../../store/offers-data/offers-data';
import { useCallback } from 'react';
import classNames from 'classnames';
import NotFoundPage from '../not-found-page/not-found-page';
import LoadingScreen from '../loading-page/loading-page';
import { AuthorizationStatus, MapTypes } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { OfferDetails } from '../../components/offer-details/offer-details';
import { useFullOfferData } from './hooks/use-full-offer-data';

function OfferPage(): JSX.Element {
	const dispatch = useAppDispatch();
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const {
		fullOffer,
		reviews,
		newReviews,
		nearbyOffers,
		isDataLoading,
		hasErrorOfferLoading,
	} = useFullOfferData();

	const handleActiveOfferChange = useCallback(
		(offer: ServerOffer | null) => {
			if (!offer) {
				dispatch(offersActions.setActiveOffer(fullOffer));
			} else {
				dispatch(offersActions.setActiveOffer(offer));
			}
		},
		[dispatch, fullOffer]
	);

	if (isDataLoading) {
		return <LoadingScreen />;
	}

	if (!fullOffer || hasErrorOfferLoading) {
		return <NotFoundPage />;
	}

	const { description, host, images, city } = fullOffer;

	return (
		<div className="page">
			<Helmet>
				<title>6 cities - Offer</title>
			</Helmet>
			<Header />
			<main className="page__main page__main--offer">
				<section className="offer">
					<div className="offer__gallery-container container">
						<div className="offer__gallery">
							{images.map((imageURL) => (
								<div key={imageURL} className="offer__image-wrapper">
									<img
										className="offer__image"
										src={imageURL}
										alt="Photo studio"
									/>
								</div>
							))}
						</div>
					</div>
					<div className="offer__container container">
						<div className="offer__wrapper">
							<OfferDetails offer={fullOffer} />
							<div className="offer__host">
								<h2 className="offer__host-title">Meet the host</h2>
								<div className="offer__host-user user">
									<div
										className={classNames(
											'offer__avatar-wrapper',
											{ ' offer__avatar-wrapper--pro': host.isPro },
											'user__avatar-wrapper'
										)}
									>
										<img
											className="offer__avatar user__avatar"
											src={host.avatarUrl}
											width={74}
											height={74}
											alt="Host avatar"
										/>
									</div>
									<span className="offer__user-name">{host.name}</span>
									{host.isPro && (
										<span className="offer__user-status">Pro</span>
									)}
								</div>
								<div className="offer__description">
									<p className="offer__text">{description}</p>
								</div>
							</div>
							<section className="offer__reviews reviews">
								<h2 className="reviews__title">
									Reviews ·{' '}
									<span className="reviews__amount">{reviews.length}</span>
								</h2>
								<ReviewsList reviews={newReviews} />
								{authorizationStatus === AuthorizationStatus.Auth && (
									<ReviewsForm />
								)}
							</section>
						</div>
					</div>
					<LeafletMap
						city={city}
						points={[...nearbyOffers, fullOffer]}
						block={MapTypes.Offer}
					/>
				</section>
				<div className="container">
					<section className="near-places places">
						<h2 className="near-places__title">
							Other places in the neighborhood
						</h2>
						<div className="near-places__list places__list">
							{nearbyOffers.map((offer) => (
								<OfferCardMemo
									block={'near-places'}
									{...offer}
									key={offer.id}
									onMouseEnter={() => handleActiveOfferChange(offer)}
									onMouseLeave={() => handleActiveOfferChange(null)}
								/>
							))}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

export default OfferPage;
