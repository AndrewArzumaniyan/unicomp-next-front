import React, { useMemo, useEffect, useContext } from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { darkMapTheme } from "./mapStyles";
import { Univer } from "@/interfaces/univer.interface";
import CustomMarker from "@/components/UI/custom-marker/CustomMarker";
import PageLoading from "@/components/UI/loading/page-loading/PageLoading";
import { ThemeContext } from "@/contexts/theme.context";

interface MapProps {
  openModal: () => void;
  setPickedUniver: (univer: Univer) => void;
  universities: Univer[];
}

const Map: React.FC<MapProps> = ({ openModal, setPickedUniver, universities }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA-zai589VLK5bztyCdsgutMH0I3a1luUM',
  });
  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {
    console.log("Университеты изменились:", universities);
  }, [universities]);
  
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      zoom={5}
      center={{ lat: 49.018993, lng: 68.033586 }}
      options={{ styles: theme === 'dark' ? darkMapTheme : [] }}
    >
      {universities.map((univer: Univer, index) => {
        const { coordinates } = univer;
        if (coordinates && typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
          return theme === 'dark' ? (
            <CustomMarker 
              key={`univer-${univer._id}`}
              coordinates={univer.coordinates}
              onclickFunction={() => {
                setPickedUniver(univer);
                openModal();
              }}
            />
          ) : 
          (
            <Marker 
              key={`univer-${univer._id}`}
              position={{
                lat: univer.coordinates[0],
                lng: univer.coordinates[1]
              }}
              onClick={() => {
                setPickedUniver(univer);
                openModal();
              }}
            />
          );
        }
        return null;
        })
      }
    </GoogleMap>
  ) : <></>;
}

export default Map;
