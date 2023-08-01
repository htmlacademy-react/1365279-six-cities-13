import { Review } from '../types/review';
import { faker } from '@faker-js/faker';

function mockReview(): Review {
	const dateFormatter = new Intl.DateTimeFormat(
		'en-US',
		{month: 'long', year: 'numeric'}
	);
	return({
		id: crypto.randomUUID(),
		date: dateFormatter.format(new Date()),
		user: {
			name: faker.internet.userName(),
			avatarUrl: faker.image.avatar(),
			isPro: faker.datatype.boolean(0.5),
		},
		comment: faker.lorem.sentence({min: 5, max: 25}),
		rating: faker.number.int({min: 0, max: 5}),
	});
}

const mockReviews = Array.from({length: 10}, mockReview);

export default mockReviews;
