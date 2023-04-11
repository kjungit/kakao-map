import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  z-index: 1;
  height: 100%;
  background-color: rgb(255, 255, 255, 0.8);
  overflow-y: auto;
`;

export const Form = styled.form`
  display: flex;
  position: sticky;
  top: 0;
`;
export const Input = styled.input`
  width: 100%;
  min-width: 200px;
  padding: 8px;
  border: 1px solid #c0c0c0;
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-bottom: 1px dashed #c0c0c0;
  cursor: pointer;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;
