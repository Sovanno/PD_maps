import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Map, ZoomControl, useYMaps } from '@pbe/react-yandex-maps';
import { geocodeAddress } from '../utils/geocode'

function MapComponent({ points }) {
  const mapRef = useRef(null);
  const ymaps = useYMaps(['multiRouter.MultiRoute']);
  const [geoPoints, setGeoPoints] = useState([]);

  useEffect(() => {
    async function fetchCoordinates() {
      try{
        const results = await Promise.all(
          points.map(async (point) => {
            const coords = await geocodeAddress(point.address);
            return {
              ...point,
              coordinates: coords,
            };
          })
        );
        setGeoPoints(results);
      } catch (error){
        console.error("Ошибка при геокодировании:", error);
      }
    }

    fetchCoordinates();
  }, [points]);

  const buildRoute = useCallback(() => {
    if (!ymaps || !mapRef.current || points.length < 2) return;

    const map = mapRef.current;
    map.geoObjects.removeAll();

    const multiRoute = new ymaps.multiRouter.MultiRoute(
      {
        referencePoints: geoPoints.map(p => p.coordinates),
        params: { routingMode: 'auto' }
      },
      {
        boundsAutoApply: true,
        routeActiveStrokeWidth: 5,
        routeActiveStrokeColor: '#1e88e5'
      }
    );
    map.geoObjects.add(multiRoute);

    geoPoints.forEach((point, idx) => {
      const placemark = new ymaps.Placemark(
        point.coordinates,
        { iconContent: `${idx + 1}`, balloonContent: point.name },
        { preset: 'islands#blueStretchyIcon' }
      );
      map.geoObjects.add(placemark);
    });
  }, [ymaps, geoPoints]);

  useEffect(() => {
    buildRoute();
  }, [buildRoute]);

  if (!ymaps) {
    return <div>Загрузка карт...</div>;
  }

  return (
    <div className="map-container">
      <h2>Маршрут по точкам</h2>
      <Map
        state={{ center: geoPoints.length ? geoPoints[0].coordinates : [55.751574, 37.573856], zoom: 10 }}
        width="100%"
        height="500px"
        instanceRef={mapRef}
        modules={['multiRouter.MultiRoute']}
      >
        <ZoomControl options={{ float: 'none' }} />
      </Map>
    </div>
  );
}

export default MapComponent;