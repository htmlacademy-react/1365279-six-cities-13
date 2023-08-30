import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component.tsx';
import { makedMockFullOffer } from '../../mocks/offers.ts';
import OfferPage from './offer-page.tsx';
import { initialState as initialOfferState } from '../../store/offer-data/offer-data.ts';
import { initialState as initialReviewsState } from '../../store/reviews-data/reviews-data.ts';
import { makeFakeStore } from '../../mocks/utils.ts';
import { AuthorizationStatus } from '../../const.ts';

describe('Component: OfferPage', () => {
	const mockFullOffer = makedMockFullOffer;
	const offerPageElementId = 'offer-page';
	const commentSendFormElementId = 'ReviewsForm';
	const loadingContainerTestId = 'loading-spinner';

	it('should render with comment form when user authorized and all info is loaded', () => {
		const initialState = {
			user: {
				authorizationStatus: AuthorizationStatus.Auth,
				userData: null,
			},
			offer: {
				...initialOfferState,
				fullOffer: mockFullOffer,
				isFullOfferLoading: false,
				isNearbyLoading: false,
			},
			reviews: {
				...initialReviewsState,
				isReviewsLoading: false,
			},
		};
		const { withStoreComponent } = withStore(
			<OfferPage />,
			makeFakeStore(initialState)
		);
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);

		expect(screen.getByTestId(offerPageElementId)).toBeInTheDocument();
		expect(screen.getByText(mockFullOffer.title)).toBeInTheDocument();
		expect(screen.getByTestId(commentSendFormElementId)).toBeInTheDocument();
	});

	it('should render without comment form when user no authorized and all info is loaded', () => {
		const initialState = {
			user: {
				authorizationStatus: AuthorizationStatus.NoAuth,
				userData: null,
			},
			offer: {
				...initialOfferState,
				fullOffer: mockFullOffer,
				isFullOfferLoading: false,
				isNearbyLoading: false,
			},
			reviews: {
				...initialReviewsState,
				reviews: [],
				isReviewsLoading: false,
			},
		};
		const { withStoreComponent } = withStore(
			<OfferPage />,
			makeFakeStore(initialState)
		);
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);

		expect(screen.getByTestId(offerPageElementId)).toBeInTheDocument();
		expect(screen.getByText(mockFullOffer.title)).toBeInTheDocument();
		expect(
			screen.queryByTestId(commentSendFormElementId)
		).not.toBeInTheDocument();
	});

	it('should render loading screen when chosen offer is loading', () => {
		const initialState = {
			user: {
				authorizationStatus: AuthorizationStatus.NoAuth,
				userData: null,
			},
			offer: {
				...initialOfferState,
				fullOffer: mockFullOffer,
				isFullOfferLoading: true,
				isNearbyLoading: true,
			},
			reviews: {
				...initialReviewsState,
				isReviewsLoading: true,
			},
		};
		const { withStoreComponent } = withStore(
			<OfferPage />,
			makeFakeStore(initialState)
		);
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);

		expect(screen.getByTestId(loadingContainerTestId)).toBeInTheDocument();
	});

	it('should render loading screen when nearby is loading', () => {
		const initialState = {
			offer: {
				...initialOfferState,
				fullOffer: mockFullOffer,
				isFullOfferLoading: false,
				isNearbyLoading: true,
			},
			reviews: {
				...initialReviewsState,
				isReviewsLoading: false,
			},
		};
		const { withStoreComponent } = withStore(
			<OfferPage />,
			makeFakeStore(initialState)
		);
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);

		expect(screen.getByTestId(loadingContainerTestId)).toBeInTheDocument();
	});

	it('should render error page when offer doesn\'t exist', () => {
		const initialState = {
			offer: {
				...initialOfferState,
				fullOffer: null,
				isFullOfferLoading: false,
				isNearbyLoading: false,
			},
			reviews: {
				...initialReviewsState,
				isReviewsLoading: false,
			},
		};
		const { withStoreComponent } = withStore(
			<OfferPage />,
			makeFakeStore(initialState)
		);
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);

		expect(screen.getByText('Error 404. Page not found.')).toBeInTheDocument();
	});
});
