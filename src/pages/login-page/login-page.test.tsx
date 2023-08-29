import { render, screen } from '@testing-library/react';
import LoginPage from './login-page';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/utils';

describe('Component: LoginPage', () => {
	it('should render correct', () => {
		const withHistoryComponent = withHistory(<LoginPage />);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore()
		);

		render(withStoreComponent);

		expect(screen.getByTestId('login-page')).toBeInTheDocument();
	});
});
