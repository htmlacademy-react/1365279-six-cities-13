import { fireEvent, render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/utils';
import { RandomCityButton } from './random-city-button';
import { offersActions } from '../../store/offers-data/offers-data';

describe('Component: OffersList', () => {
	it('should render correctly', () => {
		const { withStoreComponent } = withStore(
			<RandomCityButton />,
			makeFakeStore()
		);
		const withHistoryComponent = withHistory(withStoreComponent);

		render(withHistoryComponent);

		expect(screen.getByTestId('randomCity')).toBeInTheDocument();
		expect(screen.getByRole('link')).toBeInTheDocument();
	});

	it('changes active city when user click by link', () => {
		const withHistoryComponent = withHistory(<RandomCityButton />);
		const { withStoreComponent, mockStore } = withStore(
			withHistoryComponent,
			makeFakeStore()
		);

		render(withStoreComponent);

		fireEvent.click(screen.getByRole('link'));

		expect(mockStore.getActions()).toContainEqual({
			payload: screen.getByTestId('randomCity').textContent,
			type: offersActions.setActiveCity.type,
		});
	});
});
