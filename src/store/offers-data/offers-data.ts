import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OffersData } from '../../types/state';
import { CITIES, NameSpace } from '../../const';
import { fetchOffersAction } from '../api-actions';
import { CityName, ServerOffer } from '../../types/offer';
import { Sorting } from '../../types/sorting';

const initialState: OffersData = {
	activeCity: CITIES[0],
	offers: [],
	isOffersLoading: true,
	activeOffer: null,
	sorting: 'Popular',
};

export const offersData = createSlice({
	name: NameSpace.Offers,
	initialState,
	reducers: {
		setActiveCity: (state, action: PayloadAction<CityName>) => {
			state.activeCity = action.payload;
		},
		setSorting: (state, action: PayloadAction<Sorting>) => {
			state.sorting = action.payload;
		},
		setActiveOffer: (state, action: PayloadAction<ServerOffer | null>) => {
			state.activeOffer = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchOffersAction.pending, (state) => {
				state.isOffersLoading = true;
			})
			.addCase(fetchOffersAction.fulfilled, (state, action) => {
				state.offers = action.payload;
				state.isOffersLoading = false;
			});
	},
});

export const { setActiveCity, setSorting, setActiveOffer } = offersData.actions;
