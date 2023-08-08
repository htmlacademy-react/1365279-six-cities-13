import { useRef, useEffect } from 'react';
import { Marker, layerGroup, Icon } from 'leaflet';
import { useLeafletMap } from '../../hooks/';
import 'leaflet/dist/leaflet.css';
import { ServerOffer } from '../../types/offer';
import { City } from '../../types/offer';

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

let prevCity: City | null = null;

type MapProps = {
	city: City;
	points: ServerOffer[];
	activeOffer: ServerOffer | null;
	block: string;
};

function LeafletMap({
	city,
	points,
	activeOffer,
	block,
}: MapProps): JSX.Element {
	const mapRef = useRef(null);
	const leafletMap = useLeafletMap(mapRef, city);

	useEffect(() => {
		if (leafletMap) {
			if (prevCity && prevCity !== city) {
				leafletMap.setView(
					[city.location.latitude, city.location.longitude],
					city.location.zoom
				);
			}
			const markerLayer = layerGroup().addTo(leafletMap);

			points.forEach((point) => {
				const marker = new Marker({
					lat: point.location.latitude,
					lng: point.location.latitude,
				});

				marker
					.setIcon(
						activeOffer !== null && point.title === activeOffer.title
							? currentCustomIcon
							: defaultCustomIcon
					)
					.addTo(markerLayer);
			});
			prevCity = city;
			return () => {
				leafletMap.removeLayer(markerLayer);
			};
		}
	}, [leafletMap, points, activeOffer, city]);

	return <section ref={mapRef} className={`${block}__map map`} />;
}

export default LeafletMap;
