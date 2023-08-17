import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { FullOffer, ServerOffer } from '../types/offer';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import {
	loadOffers,
	requireAuthorization,
	setOffersLoadingStatus,
	redirectToRoute,
	loadFullOffer,
	setFullOfferLoadingStatus,
	setReviewsLoadingStatus,
	loadReviews,
	setNearbyLoadingStatus,
	loadNearby,
} from './actions';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Review } from '../types/review';

export const fetchOffersAction = createAsyncThunk<
	void,
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('data/fetchOffersAction', async (_arg, { dispatch, extra: api }) => {
	dispatch(setOffersLoadingStatus(true));
	const { data } = await api.get<ServerOffer[]>(APIRoute.Offers);
	dispatch(setOffersLoadingStatus(false));
	dispatch(loadOffers(data));
});

export const fetchFullOfferAction = createAsyncThunk<
	void,
	string,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('data/fetchFullOfferAction', async (offerId, { dispatch, extra: api }) => {
	dispatch(setFullOfferLoadingStatus(true));
	const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
	dispatch(setFullOfferLoadingStatus(false));
	dispatch(loadFullOffer(data));
});

export const fetchReviewsAction = createAsyncThunk<
	void,
	string,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('data/fetchReviewsAction', async (offerId, { dispatch, extra: api }) => {
	dispatch(setReviewsLoadingStatus(true));
	const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
	dispatch(setReviewsLoadingStatus(false));
	dispatch(loadReviews(data));
});

export const fetchNearbyAction = createAsyncThunk<
	void,
	string,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('data/fetchNearbyAction', async (offerId, { dispatch, extra: api }) => {
	dispatch(setNearbyLoadingStatus(true));
	const { data } = await api.get<ServerOffer[]>(
		`${APIRoute.Offers}/${offerId}/nearby`
	);
	dispatch(setNearbyLoadingStatus(false));
	dispatch(loadNearby(data));
});

export const checkAuthAction = createAsyncThunk<
	void,
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
	try {
		await api.get(APIRoute.Login);
		dispatch(requireAuthorization(AuthorizationStatus.Auth));
	} catch {
		dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
	}
});

export const loginAction = createAsyncThunk<
	void,
	AuthData,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(
	'user/login',
	async ({ login: email, password }, { dispatch, extra: api }) => {
		const {
			data: { token },
		} = await api.post<UserData>(APIRoute.Login, { email, password });
		saveToken(token);
		dispatch(requireAuthorization(AuthorizationStatus.Auth));
		dispatch(redirectToRoute(AppRoute.Main));
	}
);

export const logoutAction = createAsyncThunk<
	void,
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('user/logout', async (_arg, { dispatch, extra: api }) => {
	await api.delete(APIRoute.Logout);
	dropToken();
	dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
