import { styled } from "styled-components";
import { mainColor } from "../color";
import Input from "./Input";
import Select from "./Select";
import { useState } from "react";
import { IList } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setList } from "../counterSlice";
import { RootState } from "../store";

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
  index: number;
  content: IList;
  modalClose: () => void;
}

const EditForm = ({ index, content, modalClose }: IProps) => {
  const [name, setName] = useState(content.name);
  const [phone, setPhone] = useState(content.phone);
  const [group, setGroup] = useState(content.group);
  const [memo, setMemo] = useState(content.memo);
  const [isValid, setIsValid] = useState(true);
  const list = useSelector((state: RootState) => state.counter.list);
  const dispatch = useDispatch();

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
    dispatch(setList(newList));
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
      ></Input>
      <Input
        content="전화번호"
        id="phone"
        state={phone}
        setState={setPhone}
        setIsValid={setIsValid}
      ></Input>
      <Select state={group} setState={setGroup}></Select>
      <Input
        content="간단한기록"
        id="memo"
        state={memo}
        setState={setMemo}
        setIsValid={setIsValid}
      ></Input>
      <Button>저장</Button>
    </Form>
  );
};

export default EditForm;
