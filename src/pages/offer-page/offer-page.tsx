import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { ServerOffer } from '../../types/offer';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import OfferCard from '../../components/offer-card/offer-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { offersActions } from '../../store/offers-data/offers-data';
import { useEffect } from 'react';
import {
	fetchFullOfferAction,
	fetchNearbyAction,
	fetchReviewsAction,
} from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import NotFoundPage from '../not-found-page/not-found-page';
import LoadingScreen from '../loading-page/loading-page';
import { getRandomSlice } from '../../utils/common';
import {
	AuthorizationStatus,
	MAX_REVIEWS_QUANTITY,
	MapTypes,
} from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import {
	getCurrentOffer,
	getFullOfferLoadingStatus,
	getNearby,
	getNearbyLoadingStatus,
	getReviews,
	getReviewsLoadingStatus,
} from '../../store/offer-data/selector';

function OfferPage(): JSX.Element {
	const params = useParams();
	const dispatch = useAppDispatch();

	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const fullOffer = useAppSelector(getCurrentOffer);
	const reviews = useAppSelector(getReviews);
	const nearby = useAppSelector(getNearby);
	const newReviews = reviews.slice(-MAX_REVIEWS_QUANTITY);
	const isFullOfferLoading = useAppSelector(getFullOfferLoadingStatus);
	const isReviewsLoading = useAppSelector(getReviewsLoadingStatus);
	const isNearbyLoading = useAppSelector(getNearbyLoadingStatus);
	const nearbyOffers = getRandomSlice(3, nearby);

	const handleActiveOfferChange = (offer: ServerOffer | null) => {
		dispatch(offersActions.setActiveOffer(offer));
	};

	useEffect(() => {
		dispatch(fetchFullOfferAction(params.offerId as string));
		dispatch(fetchReviewsAction(params.offerId as string));
		dispatch(fetchNearbyAction(params.offerId as string));
	}, [dispatch, params.offerId]);

	if (isFullOfferLoading && isReviewsLoading && isNearbyLoading) {
		return <LoadingScreen />;
	}

	if (!fullOffer) {
		return <NotFoundPage />;
	}

	const {
		title,
		description,
		type,
		price,
		bedrooms,
		maxAdults,
		rating,
		isPremium,
		isFavorite,
		goods,
		host,
		images,
		city,
	} = fullOffer;
	const bookmarkClass = classNames(
		'offer__bookmark-button',
		{ 'offer__bookmark-button--active': isFavorite },
		'button'
	);
	const bookmarkLabel = `${isFavorite ? 'In' : 'To'} bookmarks`;

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
							{isPremium && (
								<div className="offer__mark">
									<span>Premium</span>
								</div>
							)}
							<div className="offer__name-wrapper">
								<h1 className="offer__name">{title}</h1>
								<button className={bookmarkClass} type="button">
									<svg className="offer__bookmark-icon" width={31} height={33}>
										<use xlinkHref="#icon-bookmark" />
									</svg>
									<span className="visually-hidden">{bookmarkLabel}</span>
								</button>
							</div>
							<div className="offer__rating rating">
								<div className="offer__stars rating__stars">
									<span style={{ width: `${Math.round(rating) * 20}%` }} />
									<span className="visually-hidden">Rating</span>
								</div>
								<span className="offer__rating-value rating__value">
									{rating}
								</span>
							</div>
							<ul className="offer__features">
								<li className="offer__feature offer__feature--entire">
									{type.charAt(0).toUpperCase() + type.slice(1)}
								</li>
								<li className="offer__feature offer__feature--bedrooms">
									{bedrooms} Bedrooms
								</li>
								<li className="offer__feature offer__feature--adults">
									Max {maxAdults} adults
								</li>
							</ul>
							<div className="offer__price">
								<b className="offer__price-value">€{price}</b>
								<span className="offer__price-text">&nbsp;night</span>
							</div>
							<div className="offer__inside">
								<h2 className="offer__inside-title">What&apos;s inside</h2>
								<ul className="offer__inside-list">
									{goods.map((value) => (
										<li key={value} className="offer__inside-item">
											{value}
										</li>
									))}
								</ul>
							</div>
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
								<OfferCard
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
