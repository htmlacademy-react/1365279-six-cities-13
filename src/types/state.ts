import { store } from '../store';
import { AuthorizationStatus } from '../const';
import { City, FullOffer, ServerOffer } from './offer';
import { Review } from './review';
import { Sorting } from './sorting';
import { UserData } from './user-data';

export type UserProcess = {
	authorizationStatus: AuthorizationStatus;
	userData: UserData | null;
};

export type OffersData = {
	activeCity: City['name'];
	offers: ServerOffer[];
	isOffersLoading: boolean;
	activeOffer: ServerOffer | null;
	sorting: Sorting;
	hasError: boolean;
};

export type OfferData = {
	fullOffer: FullOffer | null;
	reviews: Review[];
	nearby: ServerOffer[];
	isFullOfferLoading: boolean;
	isReviewsLoading: boolean;
	isNearbyLoading: boolean;
	isReviewSending: boolean;
	hasErrorSubmit: boolean;
};

export type FavoritesData = {
	favorites: ServerOffer[];
	isFavoritesLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
