import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory } from '../../mocks/mock-component';
import { PrivateRoute, PublicRoute } from './access-route';

describe('Component: access-route', () => {
	let mockHistory: MemoryHistory;

	beforeAll(() => {
		mockHistory = createMemoryHistory();
	});

	describe('PrivateRoute', () => {
		beforeEach(() => {
			mockHistory.push(AppRoute.Favorites);
		});

		it('should render component for public route, when user not authorized', () => {
			const expectedText = 'public route';
			const notExpectedText = 'private route';
			const preparedComponent = withHistory(
				<Routes>
					<Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
					<Route
						path={AppRoute.Favorites}
						element={
							<PrivateRoute status={AuthorizationStatus.NoAuth}>
								<span>{notExpectedText}</span>
							</PrivateRoute>
						}
					/>
				</Routes>,
				mockHistory
			);

			render(preparedComponent);

			expect(screen.getByText(expectedText)).toBeInTheDocument();
			expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
		});

		it('should render component for private route, when user authorized', () => {
			const expectedText = 'private route';
			const notExpectedText = 'public route';
			const preparedComponent = withHistory(
				<Routes>
					<Route
						path={AppRoute.Login}
						element={<span>{notExpectedText}</span>}
					/>
					<Route
						path={AppRoute.Favorites}
						element={
							<PrivateRoute status={AuthorizationStatus.Auth}>
								<span>{expectedText}</span>
							</PrivateRoute>
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

	describe('PublicRoute', () => {
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
							<PublicRoute status={AuthorizationStatus.Auth}>
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
					<Route
						path={AppRoute.Main}
						element={<span>{notExpectedText}</span>}
					/>
					<Route
						path={AppRoute.Login}
						element={
							<PublicRoute status={AuthorizationStatus.NoAuth}>
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
});
