import { ServerOffer } from '../types/offer';
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
