import { render, screen } from '@testing-library/react';
import Rating from './rating';
import userEvent from '@testing-library/user-event';

describe('Component: Rating', () => {
	it('should render correct with "isPremium" = true', () => {
		const mockOnRatingChange = vi.fn();

		render(
			<Rating onRatingChange={mockOnRatingChange} disabled={false} rating={2} />
		);

		const stars = screen.getAllByRole('radio');
		expect(screen.getByTestId('rating')).toBeInTheDocument();
		expect(stars.length).toBe(5);
		expect(stars[stars.length - 2]).toBeChecked();
	});

	it('onRatingChange should called when user click star', async () => {
		const mockOnRatingChange = vi.fn();

		render(
			<Rating onRatingChange={mockOnRatingChange} disabled={false} rating={3} />
		);
		const stars = screen.getAllByRole('radio');
		await userEvent.click(stars[1]);

		expect(mockOnRatingChange).toBeCalled();
	});
});
