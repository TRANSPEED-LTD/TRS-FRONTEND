import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useJsApiLoader } from '@react-google-maps/api';
import Directions from './Directions';
import PropTypes from 'prop-types';
import customMapStyle from './mapstyle.json';

const API_KEY = import.meta.env.VITE_API_GOOGLE_API;
const libraries = ['places'];

const SimpleMap = ({ from, to, heights }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultCenter={{ lat: 41.7151, lng: 44.8271 }}
        defaultZoom={6}
        disableDefaultUI
        gestureHandling={'greedy'}
        fullscreenControl={false}
        className={`w-100 ${heights}`}
        styles={customMapStyle}
      >
        {from && to && <Directions key={`${from}-${to}`} from={from} to={to} />}
      </Map>
    </APIProvider>
  );
};

SimpleMap.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  heights: PropTypes.string,
};

export default SimpleMap;
