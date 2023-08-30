import { screen, render } from '@testing-library/react';
import { useLeafletMap } from './use-leaflet-map.ts';
import { MutableRefObject } from 'react';
import { makedMockOffers } from '../mocks/offers.ts';

describe('Hook: useLeafletMap', () => {
	it('returns a Map instance when called', () => {
		const mockOffer = makedMockOffers[0];
		const expectedResult = 'works correct';
		const mapRef = {
			current: document.createElement('div'),
		} as MutableRefObject<HTMLElement | null>;

		const MockRefComponent = () => {
			const city = mockOffer.city;
			const map = useLeafletMap(mapRef, city);
			return (
				<div data-testid="leaflet-map">
					{map ? 'works correct' : 'works incorrect'}
				</div>
			);
		};

		render(<MockRefComponent />);
		const mapElement = screen.getByTestId('leaflet-map');

		expect(mapElement.textContent).toBe(expectedResult);
	});
});
