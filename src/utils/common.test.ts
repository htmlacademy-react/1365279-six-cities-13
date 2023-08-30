import { CITIES } from '../const';
import { makedMockOffers } from '../mocks/offers';
import { getFavoritesOfferByCities, getRandomSlice } from './common';

describe('Utility Functions', () => {
	it('should get random slice', () => {
		const mockOffers = makedMockOffers;

		const result = getRandomSlice(2, mockOffers);

		expect(result.length).toBe(2);
		expect(result[0]).not.toEqual(result[1]);
	});

	it('should return offers sorted by cities', () => {
		const mockOffers = makedMockOffers.slice(0, 3);
		mockOffers[0].city.name = mockOffers[1].city.name = CITIES[0];
		mockOffers[2].city.name = CITIES[1];

		const result = getFavoritesOfferByCities(mockOffers);

		expect(result.cities).toEqual([CITIES[0], CITIES[1]]);
		expect(result.favoritesOffersByCities[CITIES[0]].length).toBe(2);
		expect(result.favoritesOffersByCities[CITIES[1]].length).toBe(1);
	});
});
