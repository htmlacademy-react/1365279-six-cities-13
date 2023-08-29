import ReviewsItem from '../reviews-item/reviews-item';
import { Review } from '../../types/review';

type ReviewsListProps = {
	reviews: Review[];
};

function ReviewsList({ reviews }: ReviewsListProps) {
	return (
		<ul className="reviews__list" data-testid="ReviewsList">
			{reviews.map((review) => (
				<ReviewsItem {...review} key={review.id} />
			))}
		</ul>
	);
}

export default ReviewsList;
