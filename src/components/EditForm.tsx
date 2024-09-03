import { styled } from "styled-components";
import { mainColor } from "../color";
import Input from "./Input";
import Select from "./Select";
import { useState } from "react";
import { IList } from "../App";

const Form = styled.form`
  padding: 1.5rem;
  border-radius: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem 0;
  background-color: ${mainColor};
  border-radius: 0.8rem;
  border: none;
  color: white;
  margin-top: 1rem;
  font-size: 1.1rem;
  cursor: pointer;
`;

interface IProps {
  list: IList[];
  setList: React.Dispatch<React.SetStateAction<IList[]>>;
  groupList: string[];
  setGroupList: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
  content: IList;
  modalClose: () => void;
}

const EditForm = ({
  list,
  setList,
  groupList,
  setGroupList,
  index,
  content,
  modalClose,
}: IProps) => {
  const [name, setName] = useState(content.name);
  const [phone, setPhone] = useState(content.phone);
  const [group, setGroup] = useState(content.group);
  const [memo, setMemo] = useState(content.memo);
  const [isValid, setIsValid] = useState(true);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !phone || !isValid) {
      return;
    }
    const obj = {
      name,
      phone,
      group,
      memo,
    };

    const newList = [...list.slice(0, index), obj, ...list.slice(index + 1)];
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    setName("");
    setPhone("");
    setMemo("");
    modalClose();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        content="이름"
        id="name"
        state={name}
        setState={setName}
        setIsValid={setIsValid}
        list={list}
      ></Input>
      <Input
        content="전화번호"
        id="phone"
        state={phone}
        setState={setPhone}
        setIsValid={setIsValid}
        list={list}
      ></Input>
      <Select
        groupList={groupList}
        setGroupList={setGroupList}
        setState={setGroup}
        id={content.group}
      ></Select>
      <Input
        content="간단한기록"
        id="memo"
        state={memo}
        setState={setMemo}
        setIsValid={setIsValid}
        list={list}
      ></Input>
      <Button>저장</Button>
    </Form>
  );
};

export default EditForm;
