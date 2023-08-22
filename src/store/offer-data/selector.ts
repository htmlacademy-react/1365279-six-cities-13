import { NameSpace } from '../../const';
import { FullOffer, ServerOffer } from '../../types/offer';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getCurrentOffer = (state: State): FullOffer | null =>
	state[NameSpace.Offer].fullOffer;
export const getReviews = (state: State): Review[] =>
	state[NameSpace.Offer].reviews;
export const getNearby = (state: State): ServerOffer[] =>
	state[NameSpace.Offer].nearby;
export const getFullOfferLoadingStatus = (state: State): boolean =>
	state[NameSpace.Offer].isFullOfferLoading;
export const getReviewsLoadingStatus = (state: State): boolean =>
	state[NameSpace.Offer].isReviewsLoading;
export const getNearbyLoadingStatus = (state: State): boolean =>
	state[NameSpace.Offer].isNearbyLoading;
