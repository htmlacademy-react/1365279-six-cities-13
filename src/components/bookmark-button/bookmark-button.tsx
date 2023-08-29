import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FullOffer } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { AppRoute, AuthorizationStatus } from '../../const';
import classNames from 'classnames';
import {
	addFavoriteAction,
	deleteFavoriteAction,
} from '../../store/api-actions';

type BookmarkButtonProps = {
	id: FullOffer['id'];
	isFavorite: FullOffer['isFavorite'];
	block: string;
	large?: boolean;
	onClick: () => void;
};

function BookmarkButton({
	id,
	isFavorite,
	block,
	large = false,
	onClick,
}: BookmarkButtonProps) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const authorizationStatus = useAppSelector(getAuthorizationStatus);

	const bookmarkClass = classNames(
		`${block}__bookmark-button`,
		{
			[`${block}__bookmark-button--active`]:
				isFavorite && authorizationStatus === AuthorizationStatus.Auth,
		},
		'button'
	);
	const bookmarkLabel = `${isFavorite ? 'In' : 'To'} bookmarks`;

	const handleBookmarkButtonClick = () => {
		if (authorizationStatus === AuthorizationStatus.NoAuth) {
			navigate(AppRoute.Login);
		}

		if (isFavorite) {
			dispatch(deleteFavoriteAction(id));
		} else {
			dispatch(addFavoriteAction(id));
		}

		onClick();
	};

	return (
		<button
			className={bookmarkClass}
			type="button"
			onClick={handleBookmarkButtonClick}
			data-testid="bookmark-button"
		>
			<svg
				className={classNames(`${block}__bookmark-icon`)}
				width={large ? '31' : '18'}
				height={large ? '33' : '19'}
			>
				<use xlinkHref="#icon-bookmark"></use>
			</svg>
			<span className="visually-hidden">{bookmarkLabel}</span>
		</button>
	);
}

export const BookmarkButtonMemo = memo(BookmarkButton);
