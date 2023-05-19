import { FormEvent, useEffect, useRef, useState } from "react";
import { Container, Form, Input, Item, List } from "./styled";
import useMap from "../hooks/useMAp";
import { PlaceType, SearchLoacationProps } from "../types/Types";

function SearchLoacation(props: SearchLoacationProps) {
  const map = useMap();
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const placeService = useRef<kakao.maps.services.Places | null>(null);
  useEffect(() => {
    if (placeService.current) {
      return;
    }
    placeService.current = new kakao.maps.services.Places();
  }, []);

  const serachPlaces = (keyword: string) => {
    // 검색어를 받아서 검색을 실행하는 함수
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      // 검색어가 공백이면
      alert("키워드를 입력해주세요!");
      return;
    }
    if (placeService.current === null) {
      // TODO: placeService error handling
      alert("placeService.current가 null입니다.");
      return;
    }

    placeService.current.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const placeInfos = data.map((placeSearchResultItem) => {
          return {
            id: placeSearchResultItem.id,
            position: new kakao.maps.LatLng(
              Number(placeSearchResultItem.y),
              Number(placeSearchResultItem.x)
            ),
            title: placeSearchResultItem.place_name,
            address: placeSearchResultItem.address_name,
            loadAddress: placeSearchResultItem.road_address_name,
            url: placeSearchResultItem.place_url,
            category: placeSearchResultItem.category_name,
          };
        });

        props.onUpdatePlaces(placeInfos); // 부모 컴포넌트에게 검색된 장소 정보를 전달
        setPlaces(placeInfos);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    serachPlaces(keyword);
  };

  const handleItemClick = (place: PlaceType) => {
    map.setCenter(place.position);
    map.setLevel(4);
    props.onSelect(place.id);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </Form>
      <List>
        {places.map((item, index) => {
          return (
            <Item key={item.id} onClick={() => handleItemClick(item)}>
              <label htmlFor="">{`${index + 1}. ${item.title}`}</label>
              <span>{item.address}</span>
            </Item>
          );
        })}
      </List>
    </Container>
  );
}

export default SearchLoacation;
