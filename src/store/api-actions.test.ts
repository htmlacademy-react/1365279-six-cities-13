import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, extractActionsTypes } from '../mocks/utils';
import {
	addFavoriteAction,
	checkAuthAction,
	deleteFavoriteAction,
	fetchFavoritesAction,
	fetchFullOfferAction,
	fetchNearbyAction,
	fetchOffersAction,
	fetchReviewsAction,
	loginAction,
	logoutAction,
	sendReviewAction,
} from './api-actions';
import { APIRoute, FavoriteStatus } from '../const';
import { makeMockOffers } from '../mocks/offers';
import { makeMockReviews } from '../mocks/reviews';
import { AuthData } from '../types/auth-data';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
	const axios = createAPI();
	const mockAxiosAdapter = new MockAdapter(axios);
	const middleware = [thunk.withExtraArgument(axios)];
	const mockStoreCreator = configureMockStore<
		State,
		Action<string>,
		AppThunkDispatch
	>(middleware);
	let store: ReturnType<typeof mockStoreCreator>;

	beforeEach(() => {
		store = mockStoreCreator({});
	});

	describe('checkAuthAction', () => {
		it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" when server response 200', async () => {
			mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

			await store.dispatch(checkAuthAction());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				checkAuthAction.pending.type,
				checkAuthAction.fulfilled.type,
			]);
		});

		it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
			mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

			await store.dispatch(checkAuthAction());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				checkAuthAction.pending.type,
				checkAuthAction.rejected.type,
			]);
		});
	});

	describe('loginAction', () => {
		it('should dispatch "loginAction.pending", "loginAction.fulfilled" when server response 200', async () => {
			const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
			const fakeServerReplay = { token: 'secret' };
			mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

			await store.dispatch(loginAction(fakeUser));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				loginAction.pending.type,
				loginAction.fulfilled.type,
			]);
		});

		it('should call "saveToken" once with the received token', async () => {
			const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
			const fakeServerReplay = { token: 'secret' };
			mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
			const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

			await store.dispatch(loginAction(fakeUser));

			expect(mockSaveToken).toBeCalledTimes(1);
			expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
		});
	});

	describe('logoutAction', () => {
		it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
			mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

			await store.dispatch(logoutAction());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				logoutAction.pending.type,
				logoutAction.fulfilled.type,
			]);
		});

		it('should one call "dropToken" with "logoutAction"', async () => {
			mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
			const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

			await store.dispatch(logoutAction());

			expect(mockDropToken).toBeCalledTimes(1);
		});
	});

	describe('fetchOffersAction', () => {
		it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" when server response 200', async () => {
			const mockOffers = makeMockOffers;
			mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

			await store.dispatch(fetchOffersAction());
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<
				typeof fetchOffersAction.fulfilled
			>;

			expect(extractedActionsTypes).toEqual([
				fetchOffersAction.pending.type,
				fetchOffersAction.fulfilled.type,
			]);

			expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
		});

		it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" when server response 400', async () => {
			mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

			await store.dispatch(fetchOffersAction());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				fetchOffersAction.pending.type,
				fetchOffersAction.rejected.type,
			]);
		});
	});

	describe('fetchFullOfferAction', () => {
		it('should dispatch "fetchFullOfferAction.pending" and "fetchFullOfferAction.fulfilled" when server response 200', async () => {
			const mockOffer = makeMockOffers[0];
			mockAxiosAdapter
				.onGet(`${APIRoute.Offers}/offerId`)
				.reply(200, mockOffer);

			await store.dispatch(fetchFullOfferAction('offerId'));
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const fetchFullOfferActionFulfilled = emittedActions.at(1) as ReturnType<
				typeof fetchFullOfferAction.fulfilled
			>;

			expect(extractedActionsTypes).toEqual([
				fetchFullOfferAction.pending.type,
				fetchFullOfferAction.fulfilled.type,
			]);

			expect(fetchFullOfferActionFulfilled.payload).toEqual(mockOffer);
		});

		it('should dispatch "fetchFullOfferAction.pending" and "fetchFullOfferAction.rejected" when server response 400', async () => {
			mockAxiosAdapter.onGet(`${APIRoute.Offers}/offerId`).reply(400, []);

			await store.dispatch(fetchFullOfferAction('offerId'));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				fetchFullOfferAction.pending.type,
				fetchFullOfferAction.rejected.type,
			]);
		});
	});

	describe('fetchReviewsAction', () => {
		it('should dispatch "fetchReviewsAction.pending" and "fetchReviewsAction.fulfilled" when server response 200', async () => {
			const mockReviews = makeMockReviews;
			mockAxiosAdapter
				.onGet(`${APIRoute.Reviews}/offerId`)
				.reply(200, mockReviews);

			await store.dispatch(fetchReviewsAction('offerId'));
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<
				typeof fetchReviewsAction.fulfilled
			>;

			expect(extractedActionsTypes).toEqual([
				fetchReviewsAction.pending.type,
				fetchReviewsAction.fulfilled.type,
			]);

			expect(fetchReviewsActionFulfilled.payload).toEqual(mockReviews);
		});

		it('should dispatch "fetchReviewsAction.pending" and "fetchReviewsAction.rejected" when server response 400', async () => {
			mockAxiosAdapter.onGet(`${APIRoute.Reviews}/offerId`).reply(400, []);

			await store.dispatch(fetchReviewsAction('offerId'));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				fetchReviewsAction.pending.type,
				fetchReviewsAction.rejected.type,
			]);
		});
	});

	describe('fetchNearbyAction', () => {
		it('should dispatch "fetchNearbyAction.pending" and "fetchNearbyAction.fulfilled" when server response 200', async () => {
			const mockNearbyOffers = makeMockOffers;
			mockAxiosAdapter
				.onGet(`${APIRoute.Offers}/offerId/nearby`)
				.reply(200, mockNearbyOffers);

			await store.dispatch(fetchNearbyAction('offerId'));
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const fetchNearbyActionFulfilled = emittedActions.at(1) as ReturnType<
				typeof fetchNearbyAction.fulfilled
			>;

			expect(extractedActionsTypes).toEqual([
				fetchNearbyAction.pending.type,
				fetchNearbyAction.fulfilled.type,
			]);

			expect(fetchNearbyActionFulfilled.payload).toEqual(mockNearbyOffers);
		});

		it('should dispatch "fetchNearbyAction.pending" and "fetchNearbyAction.rejected" when server response 400', async () => {
			mockAxiosAdapter
				.onGet(`${APIRoute.Offers}/offerId/nearby`)
				.reply(400, []);

			await store.dispatch(fetchNearbyAction('offerId'));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				fetchNearbyAction.pending.type,
				fetchNearbyAction.rejected.type,
			]);
		});
	});

	describe('sendReviewAction', () => {
		it('should dispatch "sendReviewAction.pending" and "sendReviewAction.fulfilled" when server response 200', async () => {
			const mockReview = makeMockReviews[0];
			mockAxiosAdapter
				.onPost(`${APIRoute.Reviews}/${mockReview.id}`)
				.reply(200, mockReview);

			await store.dispatch(sendReviewAction(mockReview));
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const sendReviewActionFulfilled = emittedActions.at(1) as ReturnType<
				typeof sendReviewAction.fulfilled
			>;

			expect(extractedActionsTypes).toEqual([
				sendReviewAction.pending.type,
				sendReviewAction.fulfilled.type,
			]);

			expect(sendReviewActionFulfilled.payload).toEqual(mockReview);
		});

		it('should dispatch "sendReviewAction.pending" and "sendReviewAction.rejected" when server response 400', async () => {
			const mockReview = makeMockReviews[0];
			mockAxiosAdapter
				.onPost(`${APIRoute.Reviews}/${mockReview.id}`)
				.reply(400, []);

			await store.dispatch(sendReviewAction(mockReview));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				sendReviewAction.pending.type,
				sendReviewAction.rejected.type,
			]);
		});
	});

	describe('fetchFavoritesAction', () => {
		it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.fulfilled" when server response 200', async () => {
			const mockFavorites = makeMockOffers;
			mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockFavorites);

			await store.dispatch(fetchFavoritesAction());
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const fetchFavoritesActionFulfilled = emittedActions.at(1) as ReturnType<
				typeof fetchFavoritesAction.fulfilled
			>;

			expect(extractedActionsTypes).toEqual([
				fetchFavoritesAction.pending.type,
				fetchFavoritesAction.fulfilled.type,
			]);

			expect(fetchFavoritesActionFulfilled.payload).toEqual(mockFavorites);
		});

		it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.rejected" when server response 400', async () => {
			mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

			await store.dispatch(fetchFavoritesAction());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				fetchFavoritesAction.pending.type,
				fetchFavoritesAction.rejected.type,
			]);
		});
	});

	describe('addFavoriteAction', () => {
		it('should dispatch "addFavoriteAction.pending" and "addFavoriteAction.fulfilled" when server response 200', async () => {
			const mockFavorite = makeMockOffers[0];
			mockAxiosAdapter
				.onPost(`${APIRoute.Favorite}/${mockFavorite.id}/${FavoriteStatus.Add}`)
				.reply(200, mockFavorite.id);

			await store.dispatch(addFavoriteAction(mockFavorite.id));
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const addFavoriteActionFulfilled = emittedActions.at(1) as ReturnType<
				typeof addFavoriteAction.fulfilled
			>;

			expect(extractedActionsTypes).toEqual([
				addFavoriteAction.pending.type,
				addFavoriteAction.fulfilled.type,
			]);

			expect(addFavoriteActionFulfilled.payload).toEqual(mockFavorite.id);
		});

		it('should dispatch "addFavoriteAction.pending" and "addFavoriteAction.rejected" when server response 400', async () => {
			const mockFavorite = makeMockOffers[0];
			mockAxiosAdapter
				.onPost(`${APIRoute.Favorite}/${mockFavorite.id}/${FavoriteStatus.Add}`)
				.reply(400, []);

			await store.dispatch(addFavoriteAction(mockFavorite.id));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				addFavoriteAction.pending.type,
				addFavoriteAction.rejected.type,
			]);
		});
	});
	describe('deleteFavoriteAction', () => {
		it('should dispatch "deleteFavoriteAction.pending" and "deleteFavoriteAction.fulfilled" when server response 200', async () => {
			const mockFavorite = makeMockOffers[0];
			mockAxiosAdapter
				.onPost(
					`${APIRoute.Favorite}/${mockFavorite.id}/${FavoriteStatus.Delete}`
				)
				.reply(200, mockFavorite.id);

			await store.dispatch(deleteFavoriteAction(mockFavorite.id));
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const deleteFavoriteActionFulfilled = emittedActions.at(1) as ReturnType<
				typeof deleteFavoriteAction.fulfilled
			>;

			expect(extractedActionsTypes).toEqual([
				deleteFavoriteAction.pending.type,
				deleteFavoriteAction.fulfilled.type,
			]);

			expect(deleteFavoriteActionFulfilled.payload).toEqual(mockFavorite.id);
		});

		it('should dispatch "deleteFavoriteAction.pending" and "deleteFavoriteAction.rejected" when server response 400', async () => {
			const mockFavorite = makeMockOffers[0];
			mockAxiosAdapter
				.onPost(
					`${APIRoute.Favorite}/${mockFavorite.id}/${FavoriteStatus.Delete}`
				)
				.reply(400, []);

			await store.dispatch(deleteFavoriteAction(mockFavorite.id));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				deleteFavoriteAction.pending.type,
				deleteFavoriteAction.rejected.type,
			]);
		});
	});
});
