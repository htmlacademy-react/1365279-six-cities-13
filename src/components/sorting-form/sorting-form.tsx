import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Sorting } from '../../types/sorting';
import { SortingTypes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSorting } from '../../store/actions';

export function SortingForm(): JSX.Element {
	const dispatch = useAppDispatch();
	const activeSorting = useAppSelector((state) => state.sorting);
	const [isOpened, setIsOpened] = useState(false);
	const iconStyle = {
		transform: `translateY(-50%) ${isOpened ? 'rotate(180deg)' : ''}`,
		transition: '.2s',
	};

	function handleSortingClick(type: Sorting) {
		setIsOpened(false);
		dispatch(setSorting(type));
	}

	const sortingListElement = useRef<HTMLUListElement | null>(null);
	const sortingElement = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (
				!sortingListElement.current?.contains(e.target as Node) &&
				!sortingElement.current?.contains(e.target as Node)
			) {
				setIsOpened(false);
			}
		};
		document.addEventListener('mousedown', handler);

		return () => {
			document.removeEventListener('mousedown', handler);
		};
	});

	return (
		<form className="places__sorting" action="#" method="get">
			<span className="places__sorting-caption">Sort by</span>{' '}
			<span
				ref={sortingElement}
				className="places__sorting-type"
				tabIndex={0}
				onClick={() => setIsOpened(!isOpened)}
			>
				{SortingTypes[activeSorting]}
				<svg
					style={iconStyle}
					className="places__sorting-arrow"
					width={7}
					height={4}
				>
					<use xlinkHref="#icon-arrow-select" />
				</svg>
			</span>
			<ul
				ref={sortingListElement}
				className={classNames('places__options', 'places__options--custom', {
					'places__options--opened': isOpened,
				})}
			>
				{Object.entries(SortingTypes).map(([type, title]) => (
					<li
						key={type}
						className={classNames('places__option', {
							'places__option--active': activeSorting === type,
						})}
						tabIndex={0}
						onClick={() => handleSortingClick(type as Sorting)}
					>
						{title}
					</li>
				))}
			</ul>
		</form>
	);
}
