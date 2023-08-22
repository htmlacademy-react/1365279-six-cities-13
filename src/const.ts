const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 400;
const MAX_REVIEWS_QUANTITY = 10;

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
	Reviews = '/comments',
}

const enum MapTypes {
	Cities = 'cities',
	Offer = 'offer',
}

const enum NameSpace {
	Offer = 'offer',
	Offers = 'offers',
	User = 'user',
	Data = 'data',
}

export {
	CITIES,
	OFFER_TYPES,
	MIN_REVIEW_LENGTH,
	MAX_REVIEW_LENGTH,
	MAX_REVIEWS_QUANTITY,
	SortingTypes,
	AppRoute,
	AuthorizationStatus,
	APIRoute,
	MapTypes,
	NameSpace,
};
