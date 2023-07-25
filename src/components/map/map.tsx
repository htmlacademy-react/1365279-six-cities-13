import {useRef,useEffect} from 'react';
import {Marker, layerGroup, Icon} from 'leaflet';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { ServerOffer } from '../../mocks/offers';
import { City } from '../../hooks/use-map';

const enum UrlMarker {
  DefaultMarker = '../img/pin.svg',
  CurrentMarker = '../img/pin-active.svg'
}


type MapProps = {
  city: City;
  points: ServerOffer[];
  activeOffer?: ServerOffer;
}

const defaultCustomIcon = new Icon({
	iconUrl: UrlMarker.DefaultMarker,
	iconSize: [27, 39],
	iconAnchor: [13.5, 39]
});

const currentCustomIcon = new Icon({
	iconUrl: UrlMarker.CurrentMarker,
	iconSize: [27, 39],
	iconAnchor: [13.5, 39]
});

function Map({city, points, activeOffer}: MapProps): JSX.Element {
	const mapRef = useRef(null);
	const map = useMap(mapRef, city);

	useEffect(() => {
		if (map) {
			const markerLayer = layerGroup().addTo(map);

			points.forEach((point) => {
				const marker = new Marker({
					lat: point.location.latitude,
					lng: point.location.latitude
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
				map.removeLayer(markerLayer);
			};
		}
	}, [map, points, activeOffer]);

	return (
		<section
			ref={mapRef}
			className="cities__map map"
		/>
	);
}

export default Map;
