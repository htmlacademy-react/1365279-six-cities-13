import { useRef, useEffect } from 'react';
import { Marker, layerGroup, Icon } from 'leaflet';
import { useAppDispatch, useAppSelector, useLeafletMap } from '../../hooks/';
import 'leaflet/dist/leaflet.css';
import { FullOffer, ServerOffer } from '../../types/offer';
import { City } from '../../types/offer';
import { getActiveOffer } from '../../store/offers-data/selector';
import { getCurrentOffer } from '../../store/offer-data/selector';
import { offersActions } from '../../store/offers-data/offers-data';

const enum UrlMarker {
	DefaultMarker = '../img/pin.svg',
	CurrentMarker = '../img/pin-active.svg',
}

const defaultCustomIcon = new Icon({
	iconUrl: UrlMarker.DefaultMarker,
	iconSize: [27, 39],
	iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
	iconUrl: UrlMarker.CurrentMarker,
	iconSize: [27, 39],
	iconAnchor: [13.5, 39],
});

type MapProps = {
	city: City;
	points: (ServerOffer | FullOffer)[];
	block: string;
};

function LeafletMap({ city, points, block }: MapProps): JSX.Element {
	const dispatch = useAppDispatch();
	const mapRef = useRef(null);
	const leafletMap = useLeafletMap(mapRef, city);
	const activeOffer = useAppSelector(getActiveOffer);
	const currentPoint = useAppSelector(getCurrentOffer);

	useEffect(() => {
		dispatch(offersActions.setActiveOffer(currentPoint));
	}, [currentPoint, dispatch]);

	useEffect(() => {
		if (leafletMap) {
			const markerLayer = layerGroup().addTo(leafletMap);
			points.forEach((point) => {
				const marker = new Marker({
					lat: point.location.latitude,
					lng: point.location.longitude,
				});

				marker
					.setIcon(
						activeOffer !== null && point.id === activeOffer.id
							? currentCustomIcon
							: defaultCustomIcon
					)
					.addTo(markerLayer);
			});
			return () => {
				leafletMap.removeLayer(markerLayer);
			};
		}
	}, [leafletMap, points, activeOffer, city, block, currentPoint]);

	useEffect(() => {
		leafletMap?.setView(
			[city.location.latitude, city.location.longitude],
			city.location.zoom
		);
	}, [city, leafletMap]);

	return <section ref={mapRef} className={`${block}__map map`} />;
}

export default LeafletMap;
