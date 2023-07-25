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

type FullOffer = Omit<ServerOffer, 'previewImage'> & {
	description: string;
	bedrooms: number;
	goods: string[];
	host: {
		name: string;
		avatarUrl: string;
		isPro: boolean;
	};
	images: string[];
	maxAdults: number;
}

function mockLocation(): ServerLocation {
	return({
		latitude: faker.location.latitude(),
		longitude: faker.location.longitude(),
		zoom: faker.number.int({min: 4, max: 6}),
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

function mockFullOffer(): ServerOffer & FullOffer {
	return({
		...mockOffer(),
		description: faker.lorem.sentence({min: 5, max: 25}),
		bedrooms: faker.number.int({min: 1, max: 10}),
		goods: Array.from({ length: faker.number.int({min: 1, max: 10}) }, () => faker.lorem.word()),
		host: {
			name: faker.internet.userName(),
			avatarUrl: faker.image.avatar(),
			isPro: true,
		},
		images: Array.from({ length: faker.number.int({min: 1, max: 10}) }, () => faker.image.urlLoremFlickr({category: 'appartment'})),
		maxAdults: faker.number.int({min: 1, max: 10}),
	});
}

const mockOffers = Array.from({length: 50}, mockFullOffer);

export default mockOffers;
export type { ServerOffer, FullOffer };
