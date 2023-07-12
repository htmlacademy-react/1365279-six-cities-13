import { faker } from '@faker-js/faker';
import { CITIES, OFFER_TYPES } from '../const';

type ServerLocation = {
	latitude: number;
	longitude: number;
	zoom: number;
}

type ServerOffer = {
	id: string;
	title: string;
	type: string;
	price: number;
	city: {
		name: string;
		location: ServerLocation;
	};
	location: ServerLocation;
	isFavorite: boolean;
	isPremium: boolean;
	rating: number;
	previewImage: string;
};

function mockLocation(): ServerLocation {
	return({
		latitude: faker.location.latitude(),
		longitude: faker.location.longitude(),
		zoom: faker.number.int({min: 1, max: 10}),
	});
}

function mockOffer(): ServerOffer {
	return({
		id: crypto.randomUUID(),
		title: faker.location.streetAddress(),
		type: faker.helpers.arrayElement(OFFER_TYPES),
		price: faker.number.int({min: 100, max: 1000}),
		city: {
			name: faker.helpers.arrayElement(CITIES),
			location: mockLocation(),
		},
		location: mockLocation(),
		isFavorite: faker.datatype.boolean(),
		isPremium: faker.datatype.boolean(),
		rating: faker.number.int({min: 0, max: 5}),
		previewImage: faker.image.urlLoremFlickr({category: 'appartment'}),
	});
}

export default mockOffer;
export type { ServerOffer };
