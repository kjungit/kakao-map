import { FormEvent, useState } from "react";
import { Container, Form, Input, Item, List } from "./styled";

function SearchLoacation() {
  const [keyword, setKeyword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        {Array.from({ length: 18 }).map((item, index) => {
          return (
            <Item key={index}>
              <label htmlFor="">지역</label>
              <span>서울 강남구 신사동 222-33</span>
            </Item>
          );
        })}
      </List>
    </Container>
  );
}

export default SearchLoacation;
