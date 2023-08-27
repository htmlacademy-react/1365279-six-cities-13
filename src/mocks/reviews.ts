import { faker } from '@faker-js/faker';
import { Review } from '../types/review';

function mockReview(): Review {
	return {
		id: crypto.randomUUID(),
		comment: faker.lorem.sentence({ min: 5, max: 15 }),
		date: '2023-06-26T21:00:00.436Z',
		rating: faker.number.int({ min: 0, max: 5 }),
		user: {
			name: faker.internet.userName(),
			avatarUrl: faker.image.avatar(),
			isPro: true,
		},
	};
}

export const makeMockReviews = Array.from({ length: 3 }, mockReview);
