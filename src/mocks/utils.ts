import { AuthorizationStatus } from '../const';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

export type AppThunkDispatch = ThunkDispatch<
	State,
	ReturnType<typeof createAPI>,
	Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
	actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
	user: {
		authorizationStatus: AuthorizationStatus.NoAuth,
		userData: null,
	},
	offers: {
		activeCity: 'Paris',
		offers: [],
		isOffersLoading: false,
		activeOffer: null,
		sorting: 'Popular',
		hasError: false,
	},
	offer: {
		fullOffer: null,
		nearby: [],
		isFullOfferLoading: false,
		isNearbyLoading: false,
		hasErrorOfferLoading: false,
		hasErrorNearbyLoading: false,
	},
	favorites: {
		favorites: [],
		isIdle: true,
		isFavoritesLoading: false,
	},
	reviews: {
		reviews: [],
		isReviewsLoading: false,
		isReviewSending: false,
		isSuccessPost: false,
		hasErrorReviewsLoading: false,
	},
	...(initialState ?? {}),
});
