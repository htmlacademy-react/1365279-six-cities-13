import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { FullOffer, ServerOffer } from '../types/offer';
import { APIRoute, FavoriteStatus, NameSpace } from '../const';
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
>(`${NameSpace.Offers}/fetchOffersAction`, async (_arg, { extra: api }) => {
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
>(`${NameSpace.Offer}/fetchFullOfferAction`, async (offerId, { extra: api }) => {
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
>(`${NameSpace.Offer}/fetchReviewsAction`, async (offerId, { extra: api }) => {
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
>(`${NameSpace.Offer}/fetchNearbyAction`, async (offerId, { extra: api }) => {
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
>(`${NameSpace.Offer}/sendReview`, async ({ id, comment, rating }, { extra: api }) => {
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
>(`${NameSpace.User}/checkAuth`, async (_arg, { extra: api }) => {
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
>(`${NameSpace.User}/login`, async ({ login: email, password }, { extra: api }) => {
	const { data } = await api.post<UserData>(APIRoute.Login, {
		email,
		password,
	});
	saveToken(data.token);
	return data;
});

export const logoutAction = createAsyncThunk<
	void,
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(`${NameSpace.User}/logout`, async (_arg, { extra: api }) => {
	await api.delete(APIRoute.Logout);
	dropToken();
});

export const fetchFavoritesAction = createAsyncThunk<
	ServerOffer[],
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(`${NameSpace.Favorites}/fetchFavorites`, async (_arg, { extra: api }) => {
	const { data } = await api.get<ServerOffer[]>(APIRoute.Favorite);

	return data;
});

export const addFavoriteAction = createAsyncThunk<
	ServerOffer,
	ServerOffer['id'],
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(`${NameSpace.Favorites}/addFavorite`, async (id, { extra: api }) => {
	const { data } = await api.post<ServerOffer>(
		`${APIRoute.Favorite}/${id}/${FavoriteStatus.Add}`
	);

	return data;
});

export const deleteFavoriteAction = createAsyncThunk<
	ServerOffer,
	ServerOffer['id'],
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(`${NameSpace.Favorites}/deleteFavorite`, async (id, { extra: api }) => {
	const { data } = await api.post<ServerOffer>(
		`${APIRoute.Favorite}/${id}/${FavoriteStatus.Delete}`
	);

	return data;
});
