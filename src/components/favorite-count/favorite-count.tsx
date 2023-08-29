import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesAction } from '../../store/api-actions';
import { getFavorites } from '../../store/favorites-data/selector';

export function FavoriteCount() {
	const dispatch = useAppDispatch();
	const isIdle = useAppSelector((state) => state.favorites.isIdle);
	const favorites = useAppSelector(getFavorites);

	useEffect(() => {
		if (isIdle) {
			dispatch(fetchFavoritesAction());
		}
	}, [dispatch, isIdle]);

	return <span className="header__favorite-count">{favorites.length}</span>;
}
