import { fireEvent, render, screen } from '@testing-library/react';
import { SortingForm } from './sorting-form';
import { withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/utils';
import { SortingTypes } from '../../const';
import { offersActions } from '../../store/offers-data/offers-data';

describe('Component: SortingForm', () => {
	it('should render correct', () => {
		const expectedSortingTypeCount = Object.keys(SortingTypes).length;
		const { withStoreComponent } = withStore(<SortingForm />, makeFakeStore());

		render(withStoreComponent);

		expect(screen.getByTestId('SortingForm')).toBeInTheDocument();
		expect(screen.getByTestId('activeSorting').textContent).toBe(
			SortingTypes.Popular
		);
		expect(screen.getAllByTestId('sorting-option').length).toBe(
			expectedSortingTypeCount
		);
	});

	it('changes sort method when user click by sorting option', () => {
		const mockSortMethod = SortingTypes.Rating;
		const { withStoreComponent, mockStore } = withStore(
			<SortingForm />,
			makeFakeStore()
		);
		render(withStoreComponent);

		const activeSort = screen.getByTestId('activeSorting');
		fireEvent.click(activeSort);
		fireEvent.click(screen.getByText(mockSortMethod));

		expect(mockStore.getActions()).toContainEqual({
			payload: 'Rating',
			type: offersActions.setSorting.type,
		});
	});
});
