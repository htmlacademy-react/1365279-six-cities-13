import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveCity } from '../../store/actions';
import { CITIES } from '../../const';

export function CitiesList() {
	const activeCity = useAppSelector((state) => state.activeCity);
	const dispatch = useAppDispatch();
	return (
		<div className="tabs">
			<section className="locations container">
				<ul className="locations__list tabs__list">
					{CITIES.map((cityName) => (
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
