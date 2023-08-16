const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 400;

const CITIES = [
	'Paris',
	'Cologne',
	'Brussels',
	'Amsterdam',
	'Hamburg',
	'Dusseldorf',
] as const;

const OFFER_TYPES = ['Apartment', 'Private room', 'Villa', 'Hotel'] as const;

const enum AppRoute {
	Login = '/login',
	Favorites = '/favorites',
	Offer = '/offer',
	Main = '/',
}

const enum AuthorizationStatus {
	Auth = 'AUTH',
	NoAuth = 'NO_AUTH',
	Unknown = 'UNKNOWN',
}

const SortingTypes = {
	Popular: 'Popular',
	PriceToHigh: 'Price: low to high',
	PriceToLow: 'Price: high to low',
	Rating: 'Top rated first',
} as const;

const enum APIRoute {
	Offers = '/offers',
	Login = '/login',
	Logout = '/logout',
}

export {
	CITIES,
	OFFER_TYPES,
	MIN_REVIEW_LENGTH,
	MAX_REVIEW_LENGTH,
	AppRoute,
	SortingTypes,
	AuthorizationStatus,
	APIRoute,
};
