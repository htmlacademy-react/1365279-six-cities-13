import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { ServerOffer } from '../../types/offer';

export const getFavorites = (
	state: Pick<State, NameSpace.Favorites>
): ServerOffer[] => state[NameSpace.Favorites].favorites;
export const getFavoritesLoadingStatus = (
	state: Pick<State, NameSpace.Favorites>
): boolean => state[NameSpace.Favorites].isFavoritesLoading;
