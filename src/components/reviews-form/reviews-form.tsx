import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH } from '../../const';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendReviewAction } from '../../store/api-actions';
import {
	getReviewSendingStatus,
	getSuccessPostStatus,
} from '../../store/reviews-data/selector';
import { reviewsData } from '../../store/reviews-data/reviews-data';
import Rating from '../rating/rating';

function ReviewsForm(): JSX.Element {
	const dispatch = useAppDispatch();
	const isReviewSending = useAppSelector(getReviewSendingStatus);
	const isSuccess = useAppSelector(getSuccessPostStatus);
	const offerId = useParams().offerId;

	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');

	const isValid =
		review.length >= MIN_REVIEW_LENGTH &&
		review.length <= MAX_REVIEW_LENGTH &&
		rating !== 0;

	const resetForm = () => {
		setRating(0);
		setReview('');
	};

	useEffect(() => {
		if (isSuccess) {
			resetForm();
			dispatch(reviewsData.actions.resetSuccessPost());
		}
	}, [dispatch, isSuccess]);

	const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		if (offerId) {
			const reviewForm = {
				id: offerId,
				comment: review,
				rating: rating,
			};
			dispatch(sendReviewAction(reviewForm));
		}
	};

	function handleRatingChange(evt: ChangeEvent<HTMLInputElement>) {
		setRating(+evt.target.value);
	}

	function handleReviewChange(evt: ChangeEvent<HTMLTextAreaElement>) {
		setReview(evt.target.value);
	}

	return (
		<form
			className="reviews__form form"
			action="#"
			method="post"
			onSubmit={handleFormSubmit}
			data-testid="ReviewsForm"
		>
			<label className="reviews__label form__label" htmlFor="review">
				Your review
			</label>
			<Rating
				onRatingChange={handleRatingChange}
				disabled={isReviewSending}
				rating={rating}
			/>
			<textarea
				className="reviews__textarea form__textarea"
				id="review"
				name="review"
				placeholder="Tell how was your stay, what you like and what can be improved"
				value={review}
				onChange={handleReviewChange}
				disabled={isReviewSending === true}
				data-testid="reviews-textarea"
			/>
			<div className="reviews__button-wrapper">
				<p className="reviews__help">
					To submit review please make sure to set{' '}
					<span className="reviews__star">rating</span> and describe your stay
					with at least{' '}
					<b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>
					.
				</p>
				<button
					className="reviews__submit form__submit button"
					type="submit"
					disabled={!isValid || isReviewSending === true}
				>
					{isReviewSending ? 'Posting...' : 'Submit'}
				</button>
			</div>
		</form>
	);
}

export default ReviewsForm;
