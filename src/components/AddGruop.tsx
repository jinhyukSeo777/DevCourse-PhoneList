import styled from "styled-components";
import { Btns, Close } from "./Detail";
import { useState } from "react";
import { setGroupList, toggleModal } from "../counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

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

const AddGruop = () => {
  const [keyword, setKeyword] = useState("");
  const list = useSelector((state: RootState) => state.counter.list);
  const groupList = useSelector((state: RootState) => state.counter.groupList);
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
    dispatch(setGroupList(newList));
    localStorage.setItem("group", JSON.stringify(newList));
    setKeyword("");
  };

  const deleteGroup = (index: number) => {
    const newList = [
      ...groupList.slice(0, index),
      ...groupList.slice(index + 1),
    ];
    dispatch(setGroupList(newList));
    localStorage.setItem("group", JSON.stringify(newList));
  };

  const groupUsing = (value: string) => {
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
              disabled={groupUsing(value)}
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
