import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { FullOffer, ServerOffer } from '../types/offer';
import { APIRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Review, ReviewData } from '../types/review';

export const fetchOffersAction = createAsyncThunk<
	ServerOffer[],
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('data/fetchOffersAction', async (_arg, { extra: api }) => {
	const { data } = await api.get<ServerOffer[]>(APIRoute.Offers);
	return data;
});

export const fetchFullOfferAction = createAsyncThunk<
	FullOffer,
	string,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('data/fetchFullOfferAction', async (offerId, { extra: api }) => {
	const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
	return data;
});

export const fetchReviewsAction = createAsyncThunk<
	Review[],
	string,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('data/fetchReviewsAction', async (offerId, { extra: api }) => {
	const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
	return data;
});

export const fetchNearbyAction = createAsyncThunk<
	ServerOffer[],
	string,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('data/fetchNearbyAction', async (offerId, { extra: api }) => {
	const { data } = await api.get<ServerOffer[]>(
		`${APIRoute.Offers}/${offerId}/nearby`
	);
	return data;
});

export const sendReviewAction = createAsyncThunk<
	Review,
	ReviewData,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('data/sendReview', async ({ id, comment, rating }, { extra: api }) => {
	const { data } = await api.post<Review>(`${APIRoute.Reviews}/${id}`, {
		comment,
		rating,
	});
	return data;
});

export const checkAuthAction = createAsyncThunk<
	UserData,
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('user/checkAuth', async (_arg, { extra: api }) => {
	const { data } = await api.get<UserData>(APIRoute.Login);
	return data;
});

export const loginAction = createAsyncThunk<
	UserData,
	AuthData,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(
	'user/login',
	async ({ login: email, password }, { extra: api }) => {
		const { data } = await api.post<UserData>(APIRoute.Login, {
			email,
			password,
		});
		saveToken(data.token);
		return data;
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
>('user/logout', async (_arg, { extra: api }) => {
	await api.delete(APIRoute.Logout);
	dropToken();
});
