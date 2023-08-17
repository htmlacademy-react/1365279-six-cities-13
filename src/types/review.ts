type Review = {
	id: string;
	date: string;
	user: {
		name: string;
		avatarUrl: string;
		isPro: boolean;
	};
	comment: string;
	rating: number;
};

type ReviewData = {
	id: string;
	comment: string;
	rating: number;
};

export type { Review, ReviewData };
