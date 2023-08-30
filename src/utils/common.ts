import { CityName, ServerOffer } from '../types/offer';
import { Sorting } from '../types/sorting';
function sortPriceToHigh(a: ServerOffer, b: ServerOffer) {
	return a.price - b.price;
}

function sortPriceToLow(a: ServerOffer, b: ServerOffer) {
	return b.price - a.price;
}

function sortByRating(a: ServerOffer, b: ServerOffer) {
	return b.rating - a.rating;
}

export const sorting: Record<
	Sorting,
	(offers: ServerOffer[]) => ServerOffer[]
> = {
	Popular: (offers: ServerOffer[]) => offers.slice(),
	PriceToHigh: (offers: ServerOffer[]) => offers.slice().sort(sortPriceToHigh),
	PriceToLow: (offers: ServerOffer[]) => offers.slice().sort(sortPriceToLow),
	Rating: (offers: ServerOffer[]) => offers.slice().sort(sortByRating),
};

const getRandomInteger = (min: number, max: number) => {
	const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
	const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
	const result = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

export const getRandomElement = <El>(elements: El[] | readonly El[]) =>
	elements[getRandomInteger(0, elements.length - 1)];

export const getRandomSlice = <El>(size: number, elements: El[]) => {
	if (size > elements.length) {
		return elements;
	}
	const result: El[] = [];

	while (result.length < size) {
		let element = getRandomElement(elements);
		while (result.includes(element)) {
			element = getRandomElement(elements);
		}
		result.push(element);
	}

	return result;
};

export function getFavoritesOfferByCities(favoritesOffers: ServerOffer[]) {
	const favoritesOffersByCities: Record<string, ServerOffer[]> = {};
	const cities: CityName[] = [];
	for (const offer of favoritesOffers) {
		const city = offer.city.name;
		if (city in favoritesOffersByCities) {
			favoritesOffersByCities[city].push(offer);
			continue;
		}
		cities.push(city);

		favoritesOffersByCities[city] = [offer];
		continue;
	}

	return {favoritesOffersByCities, cities};
}
