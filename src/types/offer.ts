type ServerLocation = {
	latitude: number;
	longitude: number;
	zoom: number;
}

type City = {
  name: string;
  location: ServerLocation;
}

type ServerOffer = {
	id: string;
	title: string;
	type: string;
	price: number;
	city: City;
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

export type { ServerLocation, City, ServerOffer, FullOffer };
