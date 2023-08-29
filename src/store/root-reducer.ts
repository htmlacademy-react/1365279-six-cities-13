import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { offersData } from './offers-data/offers-data';
import { offerData } from './offer-data/offer-data';
import { favoritesData } from './favorites-data/favorites-data';
import { reviewsData } from './reviews-data/reviews-data';

export const rootReducer = combineReducers({
	[NameSpace.User]: userProcess.reducer,
	[NameSpace.Offers]: offersData.reducer,
	[NameSpace.Offer]: offerData.reducer,
	[NameSpace.Favorites]: favoritesData.reducer,
	[NameSpace.Reviews]: reviewsData.reducer,
});
