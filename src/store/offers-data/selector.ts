import { NameSpace } from '../../const';
import { CityName, ServerOffer } from '../../types/offer';
import { Sorting } from '../../types/sorting';
import { State } from '../../types/state';

export const getOffers = (state: State): ServerOffer[] =>
	state[NameSpace.Offers].offers;
export const getOffersLoadingStatus = (state: State): boolean =>
	state[NameSpace.Offers].isOffersLoading;
export const getActiveCity = (state: State): CityName =>
	state[NameSpace.Offers].activeCity;
export const getActiveOffer = (state: State): ServerOffer | null =>
	state[NameSpace.Offers].activeOffer;
export const getActiveSort = (state: State): Sorting =>
	state[NameSpace.Offers].sorting;
