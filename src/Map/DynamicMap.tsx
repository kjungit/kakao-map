import { useEffect, useRef, useState } from "react";
import { Container, Map } from "./styled";
import { KakaoMapContext } from "../hooks/useMAp";
import { DynamacMapProps } from "../types/Types";

function DynamicMap(props: DynamacMapProps) {
  const [map, setMap] = useState<kakao.maps.Map>();
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!kakaoMapRef.current) return; // null check

    const targetPoint = new window.kakao.maps.LatLng(33.450701, 126.570667);
    const option = {
      center: targetPoint,
      level: 3,
    };

    setMap(new window.kakao.maps.Map(kakaoMapRef.current, option));
  }, []);
  return (
    <>
      <Container>
        <Map ref={kakaoMapRef} />
      </Container>
      {map ? (
        <KakaoMapContext.Provider value={map}>
          {props.children}
        </KakaoMapContext.Provider>
      ) : (
        <div>지도 정보를 가져오는데 실패하였습니다.</div>
      )}
    </>
  );
}

export default DynamicMap;
