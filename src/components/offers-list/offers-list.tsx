import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import { ServerOffer } from '../../types/offer';
import { SetStateAction, useState } from 'react';

type OffersListProps = {
  currentOffers: ServerOffer[];
	activeCity: string;
}

function OffersList ({currentOffers, activeCity}: OffersListProps) {
	const [activeOffer, setActiveOffer] = useState<ServerOffer | undefined>(undefined);
	const handleActiveOfferChange = (offer: SetStateAction<ServerOffer | undefined>) => {
		setActiveOffer(offer);
	};

	return (
		<div className="cities__places-container container">
			<section className="cities__places places">
				<h2 className="visually-hidden">Places</h2>
				<b className="places__found">{currentOffers.length} places to stay in {activeCity}</b>
				<form className="places__sorting" action="#" method="get">
					<span className="places__sorting-caption">Sort by</span>{' '}
					<span className="places__sorting-type" tabIndex={0}>
						Popular
						<svg className="places__sorting-arrow" width={7} height={4}>
							<use xlinkHref="#icon-arrow-select" />
						</svg>
					</span>
					<ul className="places__options places__options--custom places__options--opened">
						<li
							className="places__option places__option--active"
							tabIndex={0}
						>
							Popular
						</li>
						<li className="places__option" tabIndex={0}>
							Price: low to high
						</li>
						<li className="places__option" tabIndex={0}>
							Price: high to low
						</li>
						<li className="places__option" tabIndex={0}>
							Top rated first
						</li>
					</ul>
				</form>
				<div className="cities__places-list places__list tabs__content">
					{currentOffers.map((offer) => (
						<OfferCard {...offer} key={offer.id} onMouseEnter={() => handleActiveOfferChange(offer)} onMouseLeave={() =>handleActiveOfferChange(undefined)} />
					))}
				</div>
			</section>
			<div className="cities__right-section">
				<Map city={currentOffers[0].city} points={currentOffers} activeOffer={activeOffer} />
			</div>
		</div>
	);
}

export default OffersList;
