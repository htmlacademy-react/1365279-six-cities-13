import { UserData } from '../types/user-data';

function mockUser(): UserData {
	return {
		id: 123,
		email: 'test@test.com',
		token: 'string',
	};
}

export const makeMockUser = mockUser();
