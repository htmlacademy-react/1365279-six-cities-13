import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory } from '../../mocks/mock-component';
import PublicRoute from './public-route';

describe('Component: PublicRoute', () => {
	let mockHistory: MemoryHistory;

	beforeAll(() => {
		mockHistory = createMemoryHistory();
	});

	beforeEach(() => {
		mockHistory.push(AppRoute.Login);
	});

	it('should render component main page, when user authorized ', () => {
		const expectedText = 'main page';
		const notExpectedText = 'login';
		const preparedComponent = withHistory(
			<Routes>
				<Route path={AppRoute.Main} element={<span>{expectedText}</span>} />
				<Route
					path={AppRoute.Login}
					element={
						<PublicRoute authorizationStatus={AuthorizationStatus.Auth}>
							<span>{notExpectedText}</span>
						</PublicRoute>
					}
				/>
			</Routes>,
			mockHistory
		);

		render(preparedComponent);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
		expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
	});

	it('should render component Login, when user not authorized', () => {
		const expectedText = 'login';
		const notExpectedText = 'main';
		const preparedComponent = withHistory(
			<Routes>
				<Route path={AppRoute.Main} element={<span>{notExpectedText}</span>} />
				<Route
					path={AppRoute.Login}
					element={
						<PublicRoute authorizationStatus={AuthorizationStatus.NoAuth}>
							<span>{expectedText}</span>
						</PublicRoute>
					}
				/>
			</Routes>,
			mockHistory
		);

		render(preparedComponent);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
		expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
	});
});
