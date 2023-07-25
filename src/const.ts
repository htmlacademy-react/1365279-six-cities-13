const TemporalData = {
	OffersCount: 5,
} as const;

const CITIES = [
	'Paris',
	'Cologne',
	'Brussels',
	'Amsterdam',
	'Hamburg',
	'Dusseldorf',
] as const;

const OFFER_TYPES = [
	'Apartment',
	'Private room',
	'Villa',
	'Hotel',
] as const;

const AppRoute = {
	Login: '/login',
	Favorites: '/favorites',
	Offer: '/offer',
	Main: '/',
} as const;

const enum AuthorizationStatus {
	Auth = 'AUTH',
	NoAuth ='NO_AUTH',
	Unknown = 'UNKNOWN',
}

const MIN_REVIEW_LENGHT = 50;
const MAX_REVIEW_LENGHT = 400;

export { TemporalData, CITIES, OFFER_TYPES, AppRoute, AuthorizationStatus, MIN_REVIEW_LENGHT, MAX_REVIEW_LENGHT };
