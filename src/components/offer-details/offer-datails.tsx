import { useState } from 'react';
import { FullOffer } from '../../types/offer';
import BookmarkButton from '../bookmark-button/bookmark-button';

type OfferDetailsProps = {
	offer: FullOffer;
};

export function OfferDetails({ offer }: OfferDetailsProps): JSX.Element {
	const {
		title,
		type,
		price,
		bedrooms,
		maxAdults,
		rating,
		isPremium,
		isFavorite,
		goods,
		id,
	} = offer;

	const [activeFavorite, setActiveFavorite] = useState(isFavorite);
	return (
		<>
			{isPremium && (
				<div className="offer__mark">
					<span>Premium</span>
				</div>
			)}
			<div className="offer__name-wrapper">
				<h1 className="offer__name">{title}</h1>
				<BookmarkButton
					id={id}
					isFavorite={activeFavorite}
					block={'offer'}
					onClick={() => setActiveFavorite((prev) => !prev)}
					large
				/>
			</div>
			<div className="offer__rating rating">
				<div className="offer__stars rating__stars">
					<span style={{ width: `${Math.round(rating) * 20}%` }} />
					<span className="visually-hidden">Rating</span>
				</div>
				<span className="offer__rating-value rating__value">{rating}</span>
			</div>
			<ul className="offer__features">
				<li className="offer__feature offer__feature--entire">
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</li>
				<li className="offer__feature offer__feature--bedrooms">
					{bedrooms} Bedrooms
				</li>
				<li className="offer__feature offer__feature--adults">
					Max {maxAdults} adults
				</li>
			</ul>
			<div className="offer__price">
				<b className="offer__price-value">€{price}</b>
				<span className="offer__price-text">&nbsp;night</span>
			</div>
			<div className="offer__inside">
				<h2 className="offer__inside-title">What&apos;s inside</h2>
				<ul className="offer__inside-list">
					{goods.map((value) => (
						<li key={value} className="offer__inside-item">
							{value}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
