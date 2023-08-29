import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import NotFoundPage from './not-found-page';
import { makeFakeStore } from '../../mocks/utils';

describe('Component: Not found page', () => {
	it('should render correct', () => {
		const expectedTitleText = 'Error 404. Page not found.';
		const expectedLinkText = 'Go to main page';

		const { withStoreComponent } = withStore(<NotFoundPage />, makeFakeStore());
		const prepComponent = withHistory(withStoreComponent);
		makeFakeStore();
		render(prepComponent);

		expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
		expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
	});
});
