import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

const render = (status) => {
  if (status === Status.LOADING) return <h1>Loading...</h1>;
  if (status === Status.FAILURE) return <h1>Error loading maps</h1>;
  return null;
};

const MapComponent = ({ locations }) => {
  const ref = useRef(null);
  const [mapSettings, setMapSettings] = useState(null);

  // //データの取得
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/api/getMapStores');
  //       console.log(response.data);
  //       setMapSettings({
  //         center: response.data.center,
  //         zoom: response.data.zoom,
  //       });
  //       setLocations(response.data.locations);
  //     } catch (err) {
  //       console.error('error:', err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //取得したデータのセット
  useEffect(() => {
    if (ref.current && locations.length > 0) {
      const averageLatitude =
        locations.reduce((acc, loc) => acc + parseFloat(loc.latitude), 0) /
        locations.length;
      const averageLongitude =
        locations.reduce((acc, loc) => acc + parseFloat(loc.longitude), 0) /
        locations.length;

      const map = new window.google.maps.Map(ref.current, {
        center: { lat: averageLatitude, lng: averageLongitude },
        zoom: 12,
      });

      locations.map((location) => {
        const marker = new window.google.maps.Marker({
          position: {
            lat: parseFloat(location.latitude),
            lng: parseFloat(location.longitude),
          },
          map: map,
          icon: {
            url: '/map-pin_yellow.png',
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });

        //InfoWindow
        marker.addListener('click', () => {
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div><strong>${location.memo}</strong><br>${location.keyword}</div>`,
            position: {
              lat: parseFloat(location.latitude),
              lng: parseFloat(location.longitude),
            },
          });

          infoWindow.open(map, marker);
        });
      });
    }
  }, [mapSettings, locations]);

  return <div ref={ref} style={{ width: '100%', height: '400px' }} />;
};

const CustomMap = ({ locations }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <MapComponent locations={locations} />
    </Wrapper>
  );
};

export default CustomMap;
