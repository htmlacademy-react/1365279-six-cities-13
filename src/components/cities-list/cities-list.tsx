import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setActiveCity } from '../../store/actions';
import { City } from '../../types/offer';

type CitiesListProps = {
	cities: City['name'][];
	activeCity: City['name'];
};

export function CitiesList({ cities, activeCity }: CitiesListProps) {
	const dispatch = useAppDispatch();
	return (
		<div className="tabs">
			<section className="locations container">
				<ul className="locations__list tabs__list">
					{cities.map((cityName) => (
						<li className="locations__item" key={cityName}>
							<Link
								className={classNames('locations__item-link', 'tabs__item', {
									'tabs__item--active': cityName === activeCity,
								})}
								onClick={() => {
									dispatch(setActiveCity(cityName));
								}}
								to="#"
							>
								<span>{cityName}</span>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
