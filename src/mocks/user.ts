import { UserData } from '../types/user-data';
import { faker } from '@faker-js/faker';

function mockUser(): UserData {
	return {
		name: 'test',
		avatarUrl: faker.image.url(),
		isPro: false,
		email: 'test@test.com',
		token: 'secret',
	};
}

export const makeMockUser = mockUser();
