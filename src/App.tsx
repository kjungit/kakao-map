import DynamicMap from "./Map/DynamicMap";
import KakaoMapScriptLoader from "./Map/KakaoMapScriptLoader";

function App() {
  return (
    <KakaoMapScriptLoader>
      <DynamicMap />
    </KakaoMapScriptLoader>
  );
}

export default App;
