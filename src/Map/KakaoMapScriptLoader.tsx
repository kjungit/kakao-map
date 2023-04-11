import React, { ReactNode, useEffect, useState } from "react";

interface KaKaoMapScriptLoaderProps {
  children: ReactNode;
}

function KakaoMapScriptLoader(props: KaKaoMapScriptLoaderProps) {
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
  useEffect(() => {
    const mapScript = document.getElementById(
      import.meta.env.VITE_KAKAO_MAP_SCRIPT_ID
    );
    if (mapScript && !window.kakao) return;

    const script = document.createElement("script"); // <script></script>
    script.id = import.meta.env.VITE_KAKAO_MAP_SCRIPT_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_APP_KEY
    }&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        // soccess
        setMapScriptLoaded(true);
      });
    };
    script.onerror = () => {
      // fail
      setMapScriptLoaded(false);
    };

    document.getElementById("root")?.appendChild(script);
  }, []);

  return (
    <>
      {mapScriptLoaded ? (
        props.children
      ) : (
        <div>
          <h1>지도를 불러오는 중입니다.</h1>
        </div>
      )}
    </>
  );
}

export default KakaoMapScriptLoader;
