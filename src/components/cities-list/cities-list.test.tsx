import { fireEvent, render, screen } from '@testing-library/react';
import { CitiesList } from './cities-list';
import { withHistory, withStore } from '../../mocks/mock-component';
import { CITIES, SortingTypes } from '../../const';
import { makeFakeStore } from '../../mocks/utils';
import { makeMockOffers } from '../../mocks/offers';
import { offersActions } from '../../store/offers-data/offers-data';

describe('Component: CitiesList', () => {
	const mockOffers = makeMockOffers;
	const expectedCount = CITIES.length;
	const activeCityIndex = 0;
	const initialState = {
		offers: {
			activeCity: CITIES[activeCityIndex],
			offers: mockOffers,
			isOffersLoading: false,
			activeOffer: null,
			sorting: SortingTypes.Popular,
			hasError: false,
		},
	};

	it('should render correct', () => {
		const withHistoryComponent = withHistory(<CitiesList />);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore(initialState)
		);

		render(withStoreComponent);

		expect(screen.getByTestId('locations__list')).toBeInTheDocument();
		expect(screen.getAllByRole('link').length).toBe(expectedCount);
		expect(screen.getAllByRole('link')[activeCityIndex]).toHaveClass(
			'tabs__item--active'
		);
	});

	it('changes active city when user click by link', () => {
		const withHistoryComponent = withHistory(<CitiesList />);
		const { withStoreComponent, mockStore } = withStore(
			withHistoryComponent,
			makeFakeStore(initialState)
		);

		render(withStoreComponent);

		fireEvent.click(screen.getAllByRole('link')[1]);

		expect(mockStore.getActions()).toContainEqual({
			payload: CITIES[1],
			type: offersActions.setActiveCity.type,
		});
	});
});
