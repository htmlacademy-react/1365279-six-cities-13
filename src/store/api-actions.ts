import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { ServerOffer } from '../types/offer';
import { APIRoute } from '../const';
import { loadOffers, setOffersLoadingStatus } from './actions';

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
