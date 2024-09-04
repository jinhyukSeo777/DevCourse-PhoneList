import styled from "styled-components";
import { mainColor } from "../color";
import { useState } from "react";
import { IList } from "../App";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Form = styled.form`
  display: flex;
  height: 3rem;
  margin-bottom: 3rem;
`;

const Input = styled.input`
  background-color: #f0f8ff;
  border: none;
  outline: none;
  width: 22rem;
  padding: 1rem;
  border-radius: 1rem;
  margin-right: 1rem;
`;

const Button = styled.div`
  background-color: ${mainColor};
  color: white;
  border: none;
  outline: none;
  border-radius: 1rem;
  font-size: 14px;
  width: 130px;
  height: 50px;
  text-align: center;
  align-content: center;
  cursor: pointer;
`;

interface IProps {
  setResult: React.Dispatch<React.SetStateAction<IList[]>>;
}

const Search = ({ setResult }: IProps) => {
  const [keyword, setKeyword] = useState("");
  const list = useSelector((state: RootState) => state.counter.list);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newList = list.filter(
      (value) =>
        value.name.includes(keyword) ||
        value.phone.includes(keyword) ||
        value.group.includes(keyword)
    );
    setResult(newList);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setKeyword(value);
  };

  const showAll = () => {
    setResult(list);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        placeholder="검색어를 입력 후 엔터를 누르세요"
        value={keyword}
        onChange={onChange}
      ></Input>
      <Button onClick={showAll}>전체리스트 보기</Button>
    </Form>
  );
};

export default Search;
