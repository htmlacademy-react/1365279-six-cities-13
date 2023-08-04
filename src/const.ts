const Cities = {
	Paris: 'Paris',
	Cologne: 'Cologne',
	Brussels: 'Brussels',
	Amsterdam: 'Amsterdam',
	Hamburg: 'Hamburg',
	Dusseldorf: 'Dusseldorf',
} as const;

const OFFER_TYPES = ['Apartment', 'Private room', 'Villa', 'Hotel'] as const;

const AppRoute = {
	Login: '/login',
	Favorites: '/favorites',
	Offer: '/offer',
	Main: '/',
} as const;

const enum AuthorizationStatus {
	Auth = 'AUTH',
	NoAuth = 'NO_AUTH',
	Unknown = 'UNKNOWN',
}

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 400;

export {
	Cities,
	OFFER_TYPES,
	AppRoute,
	AuthorizationStatus,
	MIN_REVIEW_LENGTH,
	MAX_REVIEW_LENGTH,
};
