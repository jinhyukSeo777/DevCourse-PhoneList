import styled from "styled-components";
import { Btns, Close } from "./Detail";
import { useEffect, useState } from "react";
import { toggleModal } from "../counterSlice";
import { useDispatch } from "react-redux";
import { IList } from "../App";

const Container = styled.div`
  background-color: white;
  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  h1 {
    margin-bottom: 2rem;
  }
`;

const GroupList = styled.ul`
  list-style: none;
  padding: 0;
`;

const GroupItem = styled.li`
  width: 220px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  button {
    font-size: 1.5rem;
    cursor: pointer;
    background-color: inherit;
    border: none;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  input {
    padding: 0.6rem;
    outline: none;
  }
  button {
    padding: 0.5rem;
    cursor: pointer;
  }
`;

interface IProps {
  groupList: string[];
  setGroupList: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddGruop = ({ groupList, setGroupList }: IProps) => {
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState<IList[]>([]);
  const dispatch = useDispatch();

  const modalClose = () => {
    dispatch(toggleModal());
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setKeyword(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newList = [...groupList, keyword];
    setGroupList(newList);
    localStorage.setItem("group", JSON.stringify(newList));
    setKeyword("");
  };

  useEffect(() => {
    const itemString = localStorage.getItem("list");
    if (itemString) {
      const item = JSON.parse(itemString);
      setList(item);
    }
  }, []);

  const deleteGroup = (index: number) => {
    const newList = [
      ...groupList.slice(0, index),
      ...groupList.slice(index + 1),
    ];
    setGroupList(newList);
    localStorage.setItem("group", JSON.stringify(newList));
  };

  const groupUsed = (value: string) => {
    const isUsed = list.some((v) => v.group === value);
    return isUsed;
  };

  return (
    <Container>
      <h1>그룹 관리</h1>
      <GroupList>
        {groupList.map((value, index) => (
          <GroupItem key={index}>
            <span>{value}</span>
            <button
              disabled={groupUsed(value)}
              onClick={() => deleteGroup(index)}
            >
              x
            </button>
          </GroupItem>
        ))}
      </GroupList>
      <Form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="새 그룹 이름"
          value={keyword}
        />
        <button>추가</button>
      </Form>
      <Btns>
        <Close onClick={modalClose}>닫기</Close>
      </Btns>
    </Container>
  );
};

export default AddGruop;
