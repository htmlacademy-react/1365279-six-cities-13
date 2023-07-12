import classNames from 'classnames';

type OfferCardProps = {
	image: string;
	price: number;
	rating: number;
	title: string;
	type: string;
	isPremium?: boolean;
	isBookmark?: boolean;
}

function OfferCard({
	image,
	price,
	rating,
	title,
	type,
	isPremium = false,
	isBookmark = false
} : OfferCardProps): JSX.Element {
	const bookmarkClass = classNames('place-card__bookmark-button', {'place-card__bookmark-button--active': isBookmark}, 'button');
	const bookmarkLabel = `${isBookmark ? 'In' : 'To'} bookmarks`;
	return (
		<article className="cities__card place-card">
			{isPremium && (
				<div className="place-card__mark">
					<span>Premium</span>
				</div>
			)}
			<div className="cities__image-wrapper place-card__image-wrapper">
				<a href="#">
					<img
						className="place-card__image"
						src={image}
						width={260}
						height={200}
						alt="Place image"
					/>
				</a>
			</div>
			<div className="place-card__info">
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">€{price}</b>
						<span className="place-card__price-text">/&nbsp;night</span>
					</div>
					<button
						className={bookmarkClass}
						type="button"
					>
						<svg
							className="place-card__bookmark-icon"
							width={18}
							height={19}
						>
							<use xlinkHref="#icon-bookmark" />
						</svg>
						<span className="visually-hidden">{bookmarkLabel}</span>
					</button>
				</div>
				<div className="place-card__rating rating">
					<div className="place-card__stars rating__stars">
						<span style={{ width: `${rating * 20}%` }} />
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<a href="#">{title}</a>
				</h2>
				<p className="place-card__type">{type}</p>
			</div>
		</article>
	);
}

export default OfferCard;
