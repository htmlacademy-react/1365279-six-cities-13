import { render, screen } from '@testing-library/react';
import ReviewsItem from './reviews-item';
import { makeMockReviews } from '../../mocks/reviews';

describe('Component: Rating', () => {
	it('should render correct with "isPremium" = true', () => {
		const mockReview = makeMockReviews[0];

		render(
			<ReviewsItem
				id={mockReview.id}
				date={mockReview.date}
				comment={mockReview.comment}
				rating={mockReview.rating}
				user={mockReview.user}
			/>
		);

		expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
		expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
		expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
	});
});
