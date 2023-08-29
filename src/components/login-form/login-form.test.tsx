import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../mocks/mock-component';
import { LoginForm } from './login-form';

describe('Component: LoginForm', () => {
	const loginElementTestId = 'loginElement';
	const passwordElementTestId = 'passwordElement';
	const expectedLoginValue = 'test';
	const validationText =
		'Password must contain at least one number and one letter';

	it('should render correctly', () => {
		const { withStoreComponent } = withStore(<LoginForm />, {});
		const withHistoryComponent = withHistory(withStoreComponent);

		render(withHistoryComponent);

		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeDisabled();
		expect(screen.getByTestId(loginElementTestId)).toBeInTheDocument();
		expect(screen.getByTestId(passwordElementTestId)).toBeInTheDocument();
	});

	it('should render correctly when user enter login and invalid password', async () => {
		const expectedPasswordValue = '123';
		const { withStoreComponent } = withStore(<LoginForm />, {});
		const withHistoryComponent = withHistory(withStoreComponent);

		render(withHistoryComponent);
		await userEvent.type(
			screen.getByTestId(loginElementTestId),
			expectedLoginValue
		);
		await userEvent.type(
			screen.getByTestId(passwordElementTestId),
			expectedPasswordValue
		);

		expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
		expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeDisabled();
		expect(screen.getByText(validationText)).toBeInTheDocument();
	});

	it('should render correctly when user enter login and valid password', async () => {
		const expectedPasswordValue = '123qwe';
		const { withStoreComponent } = withStore(<LoginForm />, {});
		const withHistoryComponent = withHistory(withStoreComponent);

		render(withHistoryComponent);
		await userEvent.type(
			screen.getByTestId(loginElementTestId),
			expectedLoginValue
		);
		await userEvent.type(
			screen.getByTestId(passwordElementTestId),
			expectedPasswordValue
		);

		expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
		expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
		expect(screen.getByRole('button')).not.toBeDisabled();
		expect(screen.queryByText(validationText)).not.toBeInTheDocument();
	});
});
