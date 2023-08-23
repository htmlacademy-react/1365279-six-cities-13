import { NameSpace } from '../../const';
import { CityName, ServerOffer } from '../../types/offer';
import { Sorting } from '../../types/sorting';
import { State } from '../../types/state';

export const getOffers = (
	state: Pick<State, NameSpace.Offers>
): ServerOffer[] => state[NameSpace.Offers].offers;
export const getOffersLoadingStatus = (
	state: Pick<State, NameSpace.Offers>
): boolean => state[NameSpace.Offers].isOffersLoading;
export const getActiveCity = (state: Pick<State, NameSpace.Offers>): CityName =>
	state[NameSpace.Offers].activeCity;
export const getActiveOffer = (
	state: Pick<State, NameSpace.Offers>
): ServerOffer | null => state[NameSpace.Offers].activeOffer;
export const getActiveSort = (state: State): Sorting =>
	state[NameSpace.Offers].sorting;
