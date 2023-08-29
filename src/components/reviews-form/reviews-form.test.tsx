import { render, screen } from '@testing-library/react';
import ReviewsForm from './reviews-form';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/utils';

describe('Component: ReviewsForm', () => {
	it('should render correct with "isPremium" = true', () => {
		const { withStoreComponent } = withStore(<ReviewsForm />, makeFakeStore());

		render(withStoreComponent);

		expect(screen.getByTestId('ReviewsForm')).toBeInTheDocument();
		expect(screen.getByText('Your review')).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeDisabled();
		expect(screen.getByText('Submit')).toBeInTheDocument();
	});

	it('should render correctly when user enter review', async () => {
		const expectedReviewText = 'Comment';
		const { withStoreComponent } = withStore(<ReviewsForm />, makeFakeStore());

		render(withStoreComponent);
		await userEvent.type(
			screen.getByTestId('reviews-textarea'),
			expectedReviewText
		);

		expect(screen.getByDisplayValue(expectedReviewText)).toBeInTheDocument();
	});
});
