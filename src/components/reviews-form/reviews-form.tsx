import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH } from '../../const';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendReviewAction } from '../../store/api-actions';
import {
	getReviewSendingStatus,
	getSuccessPostStatus,
} from '../../store/reviews-data/selector';
import { reviewsData } from '../../store/reviews-data/reviews-data';

function ReviewsForm(): JSX.Element {
	const dispatch = useAppDispatch();
	const isReviewSending = useAppSelector(getReviewSendingStatus);
	const isSuccess = useAppSelector(getSuccessPostStatus);
	const offerId = useParams().offerId;
	const ratingValues = {
		'1': 'terribly',
		'2': 'badly',
		'3': 'not bad',
		'4': 'good',
		'5': 'perfect',
	};

	const [formData, setFormData] = useState({
		rating: 0,
		review: '',
	});

	const isValid =
		formData.review.length >= MIN_REVIEW_LENGTH &&
		formData.review.length <= MAX_REVIEW_LENGTH &&
		formData.rating !== 0;

	const resetForm = () => {
		setFormData({
			rating: 0,
			review: '',
		});
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
				comment: formData.review,
				rating: formData.rating,
			};
			dispatch(sendReviewAction(reviewForm));
		}
	};

	function handleRatingChange(evt: ChangeEvent<HTMLInputElement>) {
		setFormData({ ...formData, rating: Number(evt.target.value) });
	}
	function handleReviewChange(evt: ChangeEvent<HTMLTextAreaElement>) {
		setFormData({ ...formData, review: evt.target.value });
	}

	return (
		<form
			className="reviews__form form"
			action="#"
			method="post"
			onSubmit={handleFormSubmit}
		>
			<label className="reviews__label form__label" htmlFor="review">
				Your review
			</label>
			<div className="reviews__rating-form form__rating">
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
								checked={formData.rating === Number(score)}
								onChange={handleRatingChange}
								disabled={isReviewSending === true}
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
				value={formData.review}
				onChange={handleReviewChange}
				disabled={isReviewSending === true}
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
