import { createAction } from '@reduxjs/toolkit';
import { City, ServerOffer, FullOffer } from '../types/offer';
import { Sorting } from '../types/sorting';
import { AppRoute, AuthorizationStatus } from '../const';
import { Review } from '../types/review';

export const loadOffers = createAction<ServerOffer[]>('offers/loadOffers');
export const setSorting = createAction<Sorting>('offers/setSorting');
export const setActiveCity = createAction<City['name']>('offers/setActiveCity');
export const setActiveOffer = createAction<ServerOffer | null>(
	'offers/setActiveOffer'
);

export const loadFullOffer = createAction<FullOffer>('offer/loadFullOffer');
export const loadReviews = createAction<Review[]>('offer/loadReviews');
export const loadNearby = createAction<ServerOffer[]>('offer/loadNearby');
export const sendReview = createAction<Review>('offer/sendReview');

export const setOffersLoadingStatus = createAction<boolean>(
	'data/setOffersLoadingStatus'
);
export const setFullOfferLoadingStatus = createAction<boolean>(
	'data/setFullOfferLoadingStatus'
);
export const setReviewsLoadingStatus = createAction<boolean>(
	'data/setReviewsLoadingStatus'
);
export const setNearbyLoadingStatus = createAction<boolean>(
	'data/setNearbyLoadingStatus'
);

export const requireAuthorization = createAction<AuthorizationStatus>(
	'user/requireAuthorization'
);
export const setUserName = createAction<string>('user/setUserName');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
