import { AuthorizationStatus } from '../../const';
import { makeMockUser } from '../../mocks/user';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { initialState, userProcess } from './user-process';

describe('UserProcess Slice', () => {
	it('should return initial state with empty action', () => {
		const emptyAction = { type: '' };
		const expectedState = initialState;

		const result = userProcess.reducer(expectedState, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('should return default initial state with empty action', () => {
		const emptyAction = { type: '' };
		const expectedState = initialState;

		const result = userProcess.reducer(undefined, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('should set "userData" and "authorizationStatus" to "Auth" with "checkAuthAction.fulfilled" action', () => {
		const mockUser = makeMockUser;
		const expectedState = {
			authorizationStatus: AuthorizationStatus.Auth,
			userData: mockUser,
		};

		const result = userProcess.reducer(
			initialState,
			checkAuthAction.fulfilled(mockUser, '', undefined)
		);

		expect(result).toEqual(expectedState);
	});

	it('should delete "userData" and set "authorizationStatus" to  "NoAuth" with "checkAuthAction.rejected" action', () => {
		const expectedState = {
			authorizationStatus: AuthorizationStatus.NoAuth,
			userData: null,
		};

		const result = userProcess.reducer(initialState, checkAuthAction.rejected);

		expect(result).toEqual(expectedState);
	});

	it('should set "userData" and "authorizationStatus" to  "Auth" with "loginAction.fulfilled" action', () => {
		const mockUser = makeMockUser;
		const expectedState = {
			authorizationStatus: AuthorizationStatus.Auth,
			userData: mockUser,
		};

		const result = userProcess.reducer(
			initialState,
			checkAuthAction.fulfilled(mockUser, '', undefined)
		);

		expect(result).toEqual(expectedState);
	});

	it('should set "authorizationStatus" to  "NoAuth" with "loginAction.rejected" action', () => {
		const expectedState = {
			...initialState,
			authorizationStatus: AuthorizationStatus.NoAuth,
		};

		const result = userProcess.reducer(initialState, loginAction.rejected);

		expect(result).toEqual(expectedState);
	});

	it('should delete "userData" and set "authorizationStatus" to  "NoAuth", with "logoutAction.fulfilled" action', () => {
		const expectedState = {
			authorizationStatus: AuthorizationStatus.NoAuth,
			userData: null,
		};

		const result = userProcess.reducer(initialState, logoutAction.fulfilled);

		expect(result).toEqual(expectedState);
	});
});
