import { useRef, useEffect } from 'react';
import { Marker, layerGroup, Icon } from 'leaflet';
import useLeafletMap from '../../hooks/use-leaflet-map';
import 'leaflet/dist/leaflet.css';
import { ServerOffer } from '../../types/offer';
import { City } from '../../types/offer';

const enum UrlMarker {
	DefaultMarker = '../img/pin.svg',
	CurrentMarker = '../img/pin-active.svg',
}

type MapProps = {
	city: City;
	points: ServerOffer[];
	activeOffer?: ServerOffer;
	block: string;
};

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
			const markerLayer = layerGroup().addTo(leafletMap);

			points.forEach((point) => {
				const marker = new Marker({
					lat: point.location.latitude,
					lng: point.location.latitude,
				});

				marker
					.setIcon(
						activeOffer !== undefined && point.title === activeOffer.title
							? currentCustomIcon
							: defaultCustomIcon
					)
					.addTo(markerLayer);
			});

			return () => {
				leafletMap.removeLayer(markerLayer);
			};
		}
	}, [leafletMap, points, activeOffer]);

	return <section ref={mapRef} className={`${block}__map map`} />;
}

export default LeafletMap;
