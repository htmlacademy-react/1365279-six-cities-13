import { render, screen } from '@testing-library/react';
import { OfferDetails } from './offer-details';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeMockFullOffer } from '../../mocks/offers';
import { makeFakeStore } from '../../mocks/utils';

describe('Component: OfferDetails', () => {
	it('should render correct with "isPremium" = true', () => {
		const mockFullOffer = makeMockFullOffer;
		mockFullOffer.isPremium = true;
		const withHistoryComponent = withHistory(
			<OfferDetails offer={mockFullOffer} />
		);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore()
		);

		render(withStoreComponent);

		expect(screen.getByText('Premium')).toBeInTheDocument();
		expect(screen.getByText(mockFullOffer.title)).toBeInTheDocument();
		expect(screen.getByText(mockFullOffer.rating)).toBeInTheDocument();
		expect(screen.getByText(mockFullOffer.type)).toBeInTheDocument();
		expect(screen.getByText(`€${mockFullOffer.price}`)).toBeInTheDocument();
		expect(screen.getAllByTestId('inside-item').length).toBe(mockFullOffer.goods.length);
	});

	it('should render correct word endings', () => {
		const mockFullOffer = makeMockFullOffer;
		mockFullOffer.bedrooms = 2;
		mockFullOffer.maxAdults = 1;
		const withHistoryComponent = withHistory(
			<OfferDetails offer={mockFullOffer} />
		);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore()
		);

		render(withStoreComponent);

		expect(
			screen.getByText(`${mockFullOffer.bedrooms} Bedrooms`)
		).toBeInTheDocument();
		expect(
			screen.getByText(`Max ${mockFullOffer.maxAdults} adult`)
		).toBeInTheDocument();
	});
});
