import { Link } from 'react-router-dom';
import type { ServerOffer } from '../../types/offer';
import { AppRoute } from '../../const';
import { HTMLAttributes, useState } from 'react';
import BookmarkButton from '../bookmark-button/bookmark-button';
import classNames from 'classnames';

type OfferCardProps = Pick<
	ServerOffer,
	| 'id'
	| 'title'
	| 'type'
	| 'price'
	| 'isFavorite'
	| 'isPremium'
	| 'rating'
	| 'previewImage'
> &
	Pick<HTMLAttributes<HTMLElement>, 'onMouseEnter' | 'onMouseLeave'> & {
		favorite?: boolean;
	};

function OfferCard({
	favorite,
	previewImage,
	price,
	rating,
	title,
	type,
	id,
	isPremium = false,
	isFavorite = false,
	onMouseEnter,
	onMouseLeave,
}: OfferCardProps): JSX.Element {
	const [activeFavorite, setActiveFavorite] = useState(isFavorite);

	return (
		<article
			className={classNames('place-card', {
				'cities__card': !favorite,
				'favorites__card': favorite,
			})}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={onMouseLeave}
		>
			{isPremium && (
				<div className="place-card__mark">
					<span>Premium</span>
				</div>
			)}
			<div
				className={classNames('place-card__image-wrapper', {
					'cities__image-wrapper': !favorite,
					'favorites__image-wrapper': favorite,
				})}
			>
				<Link to={`${AppRoute.Offer}/${id}`}>
					<img
						className="place-card__image"
						src={previewImage}
						width={favorite ? '150' : '260'}
						height={favorite ? '110' : '200'}
						alt="Place image"
					/>
				</Link>
			</div>
			<div className={classNames('place-card__info', {'favorites__card-info': favorite})}>
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">€{price}</b>
						<span className="place-card__price-text">/&nbsp;night</span>
					</div>
					<BookmarkButton
						id={id}
						isFavorite={activeFavorite}
						block={'place-card'}
						onClick={() => setActiveFavorite((prev) => !prev)}
					/>
				</div>
				<div className="place-card__rating rating">
					<div className="place-card__stars rating__stars">
						<span style={{ width: `${Math.round(rating) * 20}%` }} />
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
				</h2>
				<p className="place-card__type">
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</p>
			</div>
		</article>
	);
}

export default OfferCard;
