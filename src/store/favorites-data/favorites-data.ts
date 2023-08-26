import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoritesData } from '../../types/state';
import {
	addFavoriteAction,
	deleteFavoriteAction,
	fetchFavoritesAction,
} from '../api-actions';

const initialState: FavoritesData = {
	favorites: [],
	isIdle: true,
	isFavoritesLoading: false,
};

export const favoritesData = createSlice({
	name: NameSpace.Favorites,
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchFavoritesAction.pending, (state) => {
				state.isFavoritesLoading = true;
				state.isIdle = false;
			})
			.addCase(fetchFavoritesAction.fulfilled, (state, action) => {
				state.isFavoritesLoading = false;
				state.favorites = action.payload;
			})
			.addCase(fetchFavoritesAction.rejected, (state) => {
				state.isFavoritesLoading = false;
			})
			.addCase(addFavoriteAction.fulfilled, (state, action) => {
				state.favorites.push(action.payload);
			})
			.addCase(deleteFavoriteAction.fulfilled, (state, action) => {
				const updateOffer = action.payload;
				state.favorites = state.favorites.filter(
					({ id }) => id !== updateOffer.id
				);
			});
	},
});
