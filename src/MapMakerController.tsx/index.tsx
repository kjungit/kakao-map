import React, { useEffect } from "react";
import { MapMarkerControllerProps } from "../types/Types";
import MapMarker from "../MapMaker.tsx";
import useMap from "../hooks/useMAp";

function MapMakerController(props: MapMarkerControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (props.places.length < 1) return;

    const bounds = new kakao.maps.LatLngBounds();
    props.places.forEach((place) => {
      bounds.extend(place.position);
    });

    map.setBounds(bounds);
  }, [props.places]);

  return (
    <>
      {props.places.map((place, index) => {
        return (
          <MapMarker
            index={index}
            key={place.id}
            place={place}
            showInfo={props.selectedPlaceId === place.id}
          />
        );
      })}
    </>
  );
}

export default MapMakerController;
