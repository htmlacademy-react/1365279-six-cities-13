import { render, screen } from '@testing-library/react';
import Header from './header';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/utils';
import { AuthorizationStatus } from '../../const';
import { makeMockUser } from '../../mocks/user';

describe('Component: Footer', () => {
	it('should render correct when AuthorizationStatus.NoAuth', () => {
		const initialStore = {
			user: {
				authorizationStatus: AuthorizationStatus.NoAuth,
				userData: null,
			},
		};
		const withHistoryComponent = withHistory(<Header />);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore(initialStore)
		);

		render(withStoreComponent);

		expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
		expect(screen.getByText(/sign in/i)).toBeInTheDocument();
	});

	it('should render correct when AuthorizationStatus.Auth', () => {
		const mockUser = makeMockUser;
		const initialStore = {
			user: {
				authorizationStatus: AuthorizationStatus.Auth,
				userData: mockUser,
			},
		};
		const withHistoryComponent = withHistory(<Header />);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore(initialStore)
		);

		render(withStoreComponent);

		expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
		expect(screen.getByText(mockUser.email)).toBeInTheDocument();
		expect(screen.getByText(/sign out/i)).toBeInTheDocument();
	});
});
