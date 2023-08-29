import { render, screen } from '@testing-library/react';
import LoadingPage from './loading-page';

describe('Component: LoadingPage', () => {
	it('should render correct', () => {
		const loadingSpinnerTestId = 'loading-spinner';

		render(<LoadingPage />);
		const loadingSpinner = screen.getByTestId(loadingSpinnerTestId);

		expect(loadingSpinner).toBeInTheDocument();
	});
});
