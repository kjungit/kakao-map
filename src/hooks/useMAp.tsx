import { createContext, useContext } from "react";

export const KakaoMapContext = createContext<kakao.maps.Map | null>(null);
function useMap() {
  const kakaoMap = useContext(KakaoMapContext);

  if (!kakaoMap) {
    throw new Error("kakaMap is notFound");
  }
  return kakaoMap;
}

export default useMap;
