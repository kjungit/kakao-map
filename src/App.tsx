import { useState } from "react";
import DynamicMap from "./Map/DynamicMap";
import KakaoMapScriptLoader from "./Map/KakaoMapScriptLoader";
import SearchLoacation from "./SearchLoacation";
import { PlaceType } from "./types/Types";
import MapMakerController from "./MapMakerController.tsx";

function App() {
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState("");
  return (
    <KakaoMapScriptLoader>
      <DynamicMap>
        <MapMakerController places={places} selectedPlaceId={selectedPlaceId} />
        <SearchLoacation
          onUpdatePlaces={(places) => {
            setPlaces(places);
          }}
          onSelect={(placeId) => {
            setSelectedPlaceId(placeId);
          }}
        />
      </DynamicMap>
    </KakaoMapScriptLoader>
  );
}

export default App;
