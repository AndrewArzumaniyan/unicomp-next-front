import React, { useMemo, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { mapTheme } from "./mapStyles";
import { Univer } from "@/interfaces/univer.interface";
import CustomMarker from "@/components/UI/custom-marker/CustomMarker";
import PageLoading from "@/components/UI/loading/page-loading/PageLoading";

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
  
  useEffect(() => {
    console.log("Университеты изменились:", universities);
  }, [universities]);
  
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      zoom={5}
      center={{ lat: 49.018993, lng: 68.033586 }}
      options={{ styles: mapTheme }}
    >
      {universities.map((univer: Univer, index) => {
        const { coordinates } = univer;
        if (coordinates && typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
          console.log(univer.coordinates)
          return (
            <CustomMarker 
              key={`univer-${univer._id}`}
              coordinates={univer.coordinates}
              onclickFunction={() => {
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
