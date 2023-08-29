import { OfferCardMemo } from '../offer-card/offer-card';
import { ServerOffer } from '../../types/offer';
import { sorting } from '../../utils/common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { offersActions } from '../../store/offers-data/offers-data';
import { getActiveSort } from '../../store/offers-data/selector';
import { useCallback } from 'react';

type OffersListProps = {
	currentOffers: ServerOffer[];
};

function OffersList({ currentOffers }: OffersListProps) {
	const dispatch = useAppDispatch();
	const activeSorting = useAppSelector(getActiveSort);
	const handleActiveOfferChange = useCallback(
		(offer: ServerOffer | null) => {
			dispatch(offersActions.setActiveOffer(offer));
		},
		[dispatch]
	);

	return (
		<div
			className="cities__places-list places__list tabs__content"
			data-testid="OffersList"
		>
			{sorting[activeSorting](currentOffers).map((offer) => (
				<OfferCardMemo
					block={'cities'}
					{...offer}
					key={offer.id}
					onMouseEnter={() => handleActiveOfferChange(offer)}
					onMouseLeave={() => handleActiveOfferChange(null)}
				/>
			))}
		</div>
	);
}

export default OffersList;
