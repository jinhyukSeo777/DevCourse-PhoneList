import styled from "styled-components";
import { IList } from "../App";
import Item from "./Item";
import Search from "./Search";
import { setList } from "../counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  padding: 0;
`;

const ShowList = () => {
  const list = useSelector((state: RootState) => state.counter.list);
  const dispatch = useDispatch();
  const [result, setResult] = useState<IList[]>([]);

  useEffect(() => {
    setResult(list);
  }, [list]);

  const deleteList = (index: number) => {
    const newList = [...list.slice(0, index), ...list.slice(index + 1)];
    dispatch(setList(newList));
    localStorage.setItem("list", JSON.stringify(newList));
  };

  return (
    <Container>
      <Search setResult={setResult}></Search>
      <ItemList>
        {result.map((value, index) => (
          <Item
            key={index}
            index={index}
            content={value}
            deleteList={deleteList}
          ></Item>
        ))}
      </ItemList>
    </Container>
  );
};

export default ShowList;
