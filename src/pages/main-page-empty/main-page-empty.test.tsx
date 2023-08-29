import { render, screen } from '@testing-library/react';
import { MainPageEmpty } from './main-page-empty';
import { CITIES } from '../../const';

describe('Component: Loading page', () => {
	it('should render correct', () => {
		const expectedActiveCity = CITIES[0];
		const expectedStatus = 'No places to stay available';
		const expectedDescription = `We could not find any property available at the moment in ${expectedActiveCity}`;

		render(<MainPageEmpty activeCity={expectedActiveCity} />);

		expect(screen.getByText(expectedStatus)).toBeInTheDocument();
		expect(screen.getByText(expectedDescription)).toBeInTheDocument();
	});
});
