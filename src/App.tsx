import DynamicMap from "./Map/DynamicMap";
import KakaoMapScriptLoader from "./Map/KakaoMapScriptLoader";
import SearchLoacation from "./SearchLoacation/SearchLoacation";

function App() {
  return (
    <KakaoMapScriptLoader>
      <DynamicMap />
      <SearchLoacation />
    </KakaoMapScriptLoader>
  );
}

export default App;
