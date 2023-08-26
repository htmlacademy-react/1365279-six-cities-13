import { NameSpace } from '../../const';
import { FullOffer, ServerOffer } from '../../types/offer';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getCurrentOffer = (
	state: Pick<State, NameSpace.Offer>
): FullOffer | null => state[NameSpace.Offer].fullOffer;
export const getReviews = (state: Pick<State, NameSpace.Offer>): Review[] =>
	state[NameSpace.Offer].reviews;
export const getNearby = (state: Pick<State, NameSpace.Offer>): ServerOffer[] =>
	state[NameSpace.Offer].nearby;
export const getFullOfferLoadingStatus = (
	state: Pick<State, NameSpace.Offer>
): boolean => state[NameSpace.Offer].isFullOfferLoading;
export const getReviewsLoadingStatus = (
	state: Pick<State, NameSpace.Offer>
): boolean => state[NameSpace.Offer].isReviewsLoading;
export const getNearbyLoadingStatus = (
	state: Pick<State, NameSpace.Offer>
): boolean => state[NameSpace.Offer].isNearbyLoading;
export const getReviewSendingStatus = (
	state: Pick<State, NameSpace.Offer>
): boolean => state[NameSpace.Offer].isReviewSending;
export const getErrorOfferLoadingStatus = (state: State): boolean =>
	state[NameSpace.Offer].hasErrorOfferLoading;
export const getErrorSubmitStatus = (state: State): boolean =>
	state[NameSpace.Offer].hasErrorSubmit;
