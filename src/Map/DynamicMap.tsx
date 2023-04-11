import React, { useEffect, useRef } from "react";
import { Container, Map } from "./styled";

function DynamicMap() {
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!kakaoMapRef.current) return; // null check

    const targetPoint = new window.kakao.maps.LatLng(33.450701, 126.570667);
    const option = {
      center: targetPoint,
      level: 3,
    };

    new window.kakao.maps.Map(kakaoMapRef.current, option);
  }, []);
  return (
    <Container>
      <Map ref={kakaoMapRef} />
    </Container>
  );
}

export default DynamicMap;
