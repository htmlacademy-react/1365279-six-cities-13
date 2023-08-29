import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { makeMockReviews } from '../../mocks/reviews';

describe('Component: Rating', () => {
	it('should render correct with "isPremium" = true', () => {
		const mockReviews = makeMockReviews;

		render(<ReviewsList reviews={mockReviews} />);

		expect(screen.getByTestId('ReviewsList')).toBeInTheDocument();
	});
});
