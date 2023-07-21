import { ChangeEvent, Fragment, useState } from 'react';
import { MIN_REVIEW_LENGHT, MAX_REVIEW_LENGHT } from '../../const';

function ReviewsForm(): JSX.Element {
	const ratingValues = {
		'1': 'terribly',
		'2': 'badly',
		'3': 'not bad',
		'4': 'good',
		'5': 'perfect',
	};

	const [rating, setRating] = useState('');
	const [review, setReview] = useState('');

	const isValid = review.length >= MIN_REVIEW_LENGHT && review.length <= MAX_REVIEW_LENGHT && rating !== '';

	function handleRatingChange(evt: ChangeEvent<HTMLInputElement>) {
		setRating(evt.target.value);
	}
	function handleReviewChange(evt: ChangeEvent<HTMLTextAreaElement>) {
		setReview(evt.target.value);
	}

	return (
		<form className="reviews__form form" action="#" method="post">
			<label className="reviews__label form__label" htmlFor="review">
		Your review
			</label>
			<div className="reviews__rating-form form__rating">
				{Object.entries(ratingValues).reverse().map(([score, title]) => (
					<Fragment key={score}>
						<input
							className="form__rating-input visually-hidden"
							name="rating"
							defaultValue={score}
							id={`${score}-stars`}
							type="radio"
							checked={rating === score}
							onChange={handleRatingChange}
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
			<textarea
				className="reviews__textarea form__textarea"
				id="review"
				name="review"
				placeholder="Tell how was your stay, what you like and what can be improved"
				defaultValue={review}
				onChange={handleReviewChange}
			/>
			<div className="reviews__button-wrapper">
				<p className="reviews__help">
			To submit review please make sure to set{' '}
					<span className="reviews__star">rating</span> and describe
			your stay with at least{' '}
					<b className="reviews__text-amount">{MIN_REVIEW_LENGHT} characters</b>.
				</p>
				<button
					className="reviews__submit form__submit button"
					type="submit"
					disabled={!isValid}
				>
			Submit
				</button>
			</div>
		</form>
	);
}

export default ReviewsForm;
