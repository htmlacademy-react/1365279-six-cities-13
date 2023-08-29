import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import OffersList from './offers-list';
import { makeMockOffers } from '../../mocks/offers';
import { makeFakeStore } from '../../mocks/utils';
import { CITIES, SortingTypes } from '../../const';

describe('Component: OffersList', () => {
	it('should render correctly', () => {
		const mockOffers = makeMockOffers;
		const initialState = {
			offers: {
				activeCity: CITIES[0],
				offers: makeMockOffers,
				isOffersLoading: false,
				activeOffer: null,
				sorting: SortingTypes.Popular,
				hasError: false,
			},
		};
		const { withStoreComponent } = withStore(
			<OffersList currentOffers={mockOffers} />,
			makeFakeStore(initialState)
		);
		const withHistoryComponent = withHistory(withStoreComponent);

		render(withHistoryComponent);

		expect(screen.getByTestId('OffersList')).toBeInTheDocument();
	});
});
