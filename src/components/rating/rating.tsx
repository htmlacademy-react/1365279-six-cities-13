import { ChangeEvent, Fragment } from 'react';
type RatingProps = {
	onRatingChange: (evt: ChangeEvent<HTMLInputElement>) => void;
	disabled: boolean;
	rating: number;
};

function Rating({
	onRatingChange,
	disabled,
	rating,
}: RatingProps): JSX.Element {
	const ratingValues = {
		'1': 'terribly',
		'2': 'badly',
		'3': 'not bad',
		'4': 'good',
		'5': 'perfect',
	};

	return (
		<div className="reviews__rating-form form__rating" data-testid="rating">
			{Object.entries(ratingValues)
				.reverse()
				.map(([score, title]) => (
					<Fragment key={score}>
						<input
							className="form__rating-input visually-hidden"
							name="rating"
							value={score}
							id={`${score}-stars`}
							type="radio"
							checked={rating === Number(score)}
							onChange={onRatingChange}
							disabled={disabled}
						/>
						<label
							htmlFor={`${score}-stars`}
							className="reviews__rating-label form__rating-label"
							title={title}
						>
							<svg className="form__star-image" width={37} height={33}>
								<use xlinkHref="#icon-star" />
							</svg>
						</label>
					</Fragment>
				))}
		</div>
	);
}

export default Rating;
