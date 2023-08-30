import { render, screen } from '@testing-library/react';
import LeafletMap from './leaflet-map';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makedMockOffers } from '../../mocks/offers';
import { makeFakeStore } from '../../mocks/utils';

describe('Component: LeafletMap', () => {
	it('should render correctly', () => {
		const mockOffers = makedMockOffers;

		const { withStoreComponent } = withStore(
			<LeafletMap
				city={mockOffers[0].city}
				points={mockOffers}
				block="cities"
			/>,
			makeFakeStore()
		);

		const prepComponent = withHistory(withStoreComponent);
		render(prepComponent);

		expect(screen.getByTestId('leaflet-map')).toBeInTheDocument();
	});
});
