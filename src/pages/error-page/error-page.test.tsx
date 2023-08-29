import { render, screen } from '@testing-library/react';
import { ErrorPage } from './error-page.tsx';
import { withHistory, withStore } from '../../mocks/mock-component.tsx';
import { extractActionsTypes, makeFakeStore } from '../../mocks/utils.ts';
import { fetchOffersAction } from '../../store/api-actions.ts';
import userEvent from '@testing-library/user-event';
import { APIRoute } from '../../const.ts';

describe('Component: ErrorPage', () => {
	it('should render correctly', () => {
		const expectedText = 'Oops! Something went wrong.';
		const { withStoreComponent } = withStore(<ErrorPage />, makeFakeStore());

		const prepComponent = withHistory(withStoreComponent);
		render(prepComponent);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('should dispatch "fetchOffersAction" when user clicked replay button', async () => {
		const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
			<ErrorPage />,
			{}
		);
		mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, []);

		render(withStoreComponent);
		await userEvent.click(screen.getByRole('button'));
		const actions = extractActionsTypes(mockStore.getActions());

		expect(actions).toEqual([
			fetchOffersAction.pending.type,
			fetchOffersAction.fulfilled.type,
		]);
	});
});
