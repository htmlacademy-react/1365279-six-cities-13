import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../../mocks/mock-component';

describe('Component: Footer', () => {
	it('should render correct', () => {
		const expectedAltText = '6 cities logo';
		const withHistoryComponent = withHistory(<Footer />);

		render(withHistoryComponent);

		expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
	});
});
