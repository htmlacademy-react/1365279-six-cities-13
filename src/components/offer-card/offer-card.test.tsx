import { render, screen } from '@testing-library/react';
import { OfferCardMemo } from './offer-card';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makedMockOffers } from '../../mocks/offers';
import { makeFakeStore } from '../../mocks/utils';
import userEvent from '@testing-library/user-event';

describe('Component: OfferCard', () => {
	const mockOffer = makedMockOffers[0];
	const mockHandleActiveOfferChange = vi.fn();

	it('should render correct with "isPremium" = true, block = "favorites"', () => {
		const withHistoryComponent = withHistory(
			<OfferCardMemo
				block={'favorites'}
				{...mockOffer}
				isPremium
				key={mockOffer.id}
				onMouseEnter={() => mockHandleActiveOfferChange}
				onMouseLeave={() => mockHandleActiveOfferChange}
			/>
		);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore()
		);

		render(withStoreComponent);

		expect(screen.getByAltText('Place image')).toBeInTheDocument();
		expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
		expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
		expect(screen.getByText('Premium')).toBeInTheDocument();
		expect(screen.getByTestId('card-info')).toHaveClass('favorites__card-info');
	});

	it('should render correct with "isPremium" = false, block != "favorites"', () => {
		const withHistoryComponent = withHistory(
			<OfferCardMemo
				block={'cities'}
				{...mockOffer}
				isPremium={false}
				key={mockOffer.id}
				onMouseEnter={() => mockHandleActiveOfferChange}
				onMouseLeave={() => mockHandleActiveOfferChange}
			/>
		);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore()
		);

		render(withStoreComponent);

		expect(screen.getByAltText('Place image')).toBeInTheDocument();
		expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
		expect(screen.queryByText('Premium')).not.toBeInTheDocument();
		expect(screen.getByTestId('card-info')).not.toHaveClass(
			'favorites__card-info'
		);
	});

	it('should called "mockHandleActiveOfferChange" when user hover and unhover offer card', async () => {
		const withHistoryComponent = withHistory(
			<OfferCardMemo
				block={'cities'}
				{...mockOffer}
				key={mockOffer.id}
				onMouseEnter={mockHandleActiveOfferChange}
				onMouseLeave={mockHandleActiveOfferChange}
			/>
		);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore()
		);

		render(withStoreComponent);
		await userEvent.hover(screen.getByTestId('offerCard'));
		await userEvent.unhover(screen.getByTestId('offerCard'));

		expect(mockHandleActiveOfferChange).toBeCalledTimes(2);
	});
});
