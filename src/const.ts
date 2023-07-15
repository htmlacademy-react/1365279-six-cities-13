const TemporalData = {
	offersCount: 5,
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

enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  Root = '/',
}

export { TemporalData, CITIES, OFFER_TYPES, AppRoute };
