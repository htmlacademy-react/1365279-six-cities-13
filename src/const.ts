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

export { TemporalData, CITIES, OFFER_TYPES };
