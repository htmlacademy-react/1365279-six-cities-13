import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Map as LeafletMap, TileLayer } from 'leaflet';
import { City } from '../types/offer';

function useLeafletMap(mapRef: MutableRefObject<HTMLElement | null>, city: City): LeafletMap | null {
	const [leafletMap, setleafletMap] = useState<LeafletMap | null>(null);
	const isRenderedRef = useRef<boolean>(false);

	useEffect(() => {
		if (mapRef.current !== null && !isRenderedRef.current) {
			const instance = new LeafletMap(mapRef.current, {
				center: {
					lat: city.location.latitude,
					lng: city.location.longitude
				},
				zoom: city.location.zoom
			});

			const layer = new TileLayer(
				'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
				{
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
				}
			);

			instance.addLayer(layer);

			setleafletMap(instance);
			isRenderedRef.current = true;
		}
	}, [mapRef, city]);

	return leafletMap;
}

export default useLeafletMap;
