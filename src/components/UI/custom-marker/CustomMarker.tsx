import React, { FC } from "react";
import { Marker } from "@react-google-maps/api";

const CustomMarker: FC<any> = ({ id, coordinates, onclickFunction }) => {
  return (
    <Marker
      key={`univer-${id}`}
      icon={{
        url: "/images/marker.png",
        anchor: new google.maps.Point(35, 35),
        scaledSize: new google.maps.Size(70, 70),
        labelOrigin: new google.maps.Point(35, 35)
      }}
      position={{
        lat: coordinates[0],
        lng: coordinates[1],
      }}
      onClick={onclickFunction}
    />
  );
}

export default CustomMarker