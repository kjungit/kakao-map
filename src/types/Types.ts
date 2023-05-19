import { ReactNode } from "react";

export interface DynamacMapProps {
  children: ReactNode;
}

export interface KaKaoMapScriptLoaderProps {
  children: ReactNode;
}

export interface PlaceType {
  id: string;
  position: kakao.maps.LatLng;
  title: string;
  address: string;
  loadAddress: string;
  url: string;
  category: string;
}

export interface SearchLoacationProps {
  onUpdatePlaces: (places: PlaceType[]) => void;
  onSelect: (placeId: string) => void;
}

export interface MapMarkerControllerProps {
  places: PlaceType[];
  selectedPlaceId?: string;
}

export interface MapMarkerProps {
  place: PlaceType;
  index: number;
  showInfo?: boolean;
}
