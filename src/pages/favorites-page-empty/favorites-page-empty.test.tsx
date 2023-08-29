import { render, screen } from '@testing-library/react';
import { FavoritesPageEmpty } from './favorites-page-empty';
describe('Component: LoginPage', () => {
	it('should render correct', () => {
		const expectedText = 'Nothing yet saved.';

		render(<FavoritesPageEmpty />);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});
});
