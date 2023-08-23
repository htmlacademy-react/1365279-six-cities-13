import OfferCard from '../offer-card/offer-card';
import { ServerOffer } from '../../types/offer';
import { sorting } from '../../utils/common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { offersActions } from '../../store/offers-data/offers-data';
import { getActiveSort } from '../../store/offers-data/selector';

type OffersListProps = {
	currentOffers: ServerOffer[];
};

function OffersList({ currentOffers }: OffersListProps) {
	const dispatch = useAppDispatch();
	const activeSorting = useAppSelector(getActiveSort);
	const handleActiveOfferChange = (offer: ServerOffer | null) => {
		dispatch(offersActions.setActiveOffer(offer));
	};

	return (
		<div className="cities__places-list places__list tabs__content">
			{sorting[activeSorting](currentOffers).map((offer) => (
				<OfferCard
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
