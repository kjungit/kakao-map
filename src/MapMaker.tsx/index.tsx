import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { MapMarkerProps } from "../types/Types";
import useMap from "../hooks/useMAp";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

const MARKER_IMAGE_URL =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
function MapMarker(props: MapMarkerProps) {
  const map = useMap();

  const container = useRef(document.createElement("div"));

  const infoWindow = useMemo(() => {
    container.current.style.position = "absolute";
    container.current.style.bottom = "40px";

    return new kakao.maps.CustomOverlay({
      position: props.place.position,
      content: container.current,
      map: map,
    });
  }, []);

  const marker = useMemo(() => {
    const imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, props.index * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    };

    const markerImage = new kakao.maps.MarkerImage(
      MARKER_IMAGE_URL,
      imageSize,
      imgOptions
    );

    const marker = new kakao.maps.Marker({
      map: map,
      position: props.place.position,
      image: markerImage,
    });

    kakao.maps.event.addListener(marker, "click", () => {
      map.setCenter(props.place.position);
      map.setLevel(4, {
        animate: true,
      });
      infoWindow.setMap(map);
    });

    return marker;
  }, []);

  useLayoutEffect(() => {
    marker.setMap(map); // 지도 위에 마커를 표출합니다
    return () => {
      marker.setMap(null);
    };
  }, [map]);

  useEffect(() => {
    if (props.showInfo) {
      infoWindow.setMap(map);
      console.log(props.place.title);
      return;
    }

    return () => {
      infoWindow.setMap(null);
    };
    // 선택 해제
  }, [props.showInfo]);

  // ReactDom.createPortal : 두번째 인자 container.current를 첫번째 인자에 자식 요소로 넣어준다.
  return container.current
    ? ReactDOM.createPortal(
        <Message
          onClick={() => {
            infoWindow.setMap(null);
          }}
        >
          <label>{props.place.title}</label>
          <div>{props.place.address}</div>
        </Message>,
        container.current
      )
    : null;
}

const Message = styled.section`
  width: 180px;
  min-height: 50px;
  margin-left: -90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  border: 3px solid #22188d;
  background-color: white;
  font-size: 12px;
  label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 6px;
  }
`;

export default MapMarker;
