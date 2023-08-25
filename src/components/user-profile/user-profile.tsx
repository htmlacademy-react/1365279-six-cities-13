import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getUserName } from '../../store/user-process/selector';
import { getFavorites } from '../../store/favorites-data/selector';

export function UserProfile() {
	const userName = useAppSelector(getUserName);
	const favorites = useAppSelector(getFavorites);

	return (
		<li className="header__nav-item user">
			<Link
				className="header__nav-link header__nav-link--profile"
				to={AppRoute.Favorites}
			>
				<div className="header__avatar-wrapper user__avatar-wrapper"></div>
				<span className="header__user-name user__name">{userName}</span>
				<span className="header__favorite-count">{favorites.length}</span>
			</Link>
		</li>
	);
}
