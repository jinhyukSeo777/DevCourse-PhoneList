import styled from "styled-components";
import { IList } from "../App";
import Item from "./Item";
import Search from "./Search";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  padding: 0;
`;

interface IProps {
  list: IList[];
  setList: React.Dispatch<React.SetStateAction<IList[]>>;
  groupList: string[];
  setGroupList: React.Dispatch<React.SetStateAction<string[]>>;
}

const ShowList = ({ list, setList, groupList, setGroupList }: IProps) => {
  const deleteList = (index: number) => {
    const newList = [...list.slice(0, index), ...list.slice(index + 1)];
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  };

  return (
    <Container>
      <Search setList={setList}></Search>
      <ItemList>
        {list.map((value, index) => (
          <Item
            key={index}
            index={index}
            content={value}
            deleteList={deleteList}
            list={list}
            setList={setList}
            groupList={groupList}
            setGroupList={setGroupList}
          ></Item>
        ))}
      </ItemList>
    </Container>
  );
};

export default ShowList;
