import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component.tsx';
import { ErrorOfferPage } from './error-offer-page.tsx';

describe('Component: ErrorPage', () => {
	it('should render correctly', () => {
		const expectedText = 'Oops! Something went wrong.';

		const prepComponent = withHistory(<ErrorOfferPage />);
		render(prepComponent);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
		expect(screen.getByRole('link')).toBeInTheDocument();
	});
});
