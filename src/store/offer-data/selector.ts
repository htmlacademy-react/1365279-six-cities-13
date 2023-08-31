import { NameSpace } from '../../const';
import { FullOffer, ServerOffer } from '../../types/offer';
import { State } from '../../types/state';

export const getCurrentOffer = (
	state: Pick<State, NameSpace.Offer>
): FullOffer | null => state[NameSpace.Offer].fullOffer;
export const getNearby = (state: Pick<State, NameSpace.Offer>): ServerOffer[] =>
	state[NameSpace.Offer].nearby;
export const getFullOfferLoadingStatus = (
	state: Pick<State, NameSpace.Offer>
): boolean => state[NameSpace.Offer].isFullOfferLoading;
export const getNearbyLoadingStatus = (
	state: Pick<State, NameSpace.Offer>
): boolean => state[NameSpace.Offer].isNearbyLoading;
export const getErrorOfferLoadingStatus = (state: State): boolean =>
	state[NameSpace.Offer].hasErrorOfferLoading;
export const getErrorNearbyLoadingStatus = (state: State): boolean =>
	state[NameSpace.Offer].hasErrorNearbyLoading;
