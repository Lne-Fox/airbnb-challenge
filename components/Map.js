import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useState } from 'react';
import getCenter from 'geolib/es/getCenter';
import { LocationMarkerIcon } from '@heroicons/react/solid';

function Map({ SearchResults }) {

  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = SearchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  })

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/adi1202/cks1qi2214wfu17pe4njofi9l'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {SearchResults.map(result => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p onClick={() => setSelectedLocation(result)} className='cursor-pointer text-xl animate-pulse'><LocationMarkerIcon className='h-6 text-gray-800' aria-label='push-pin' /></p>
          </Marker>

          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}

    </ReactMapGL >
  )
}

export default Map
