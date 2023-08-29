import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';
import { useAppDispatch } from '../../hooks';
import { getRandomElement } from '../../utils/common';
import { offersActions } from '../../store/offers-data/offers-data';

export const RandomCityButton = () => {
	const dispatch = useAppDispatch();
	const randomCity = getRandomElement(CITIES);

	const handleButtonClick = () => {
		dispatch(offersActions.setActiveCity(randomCity));
	};

	return (
		<div className="locations__item" data-testid="randomCity">
			<Link
				className="locations__item-link"
				to={AppRoute.Main}
				onClick={handleButtonClick}
			>
				<span data-testid="city-name">{randomCity}</span>
			</Link>
		</div>
	);
};
