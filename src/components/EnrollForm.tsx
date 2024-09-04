import { styled } from "styled-components";
import { mainColor } from "../color";
import Input from "./Input";
import Select from "./Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setList } from "../counterSlice";
import { RootState } from "../store";

const Form = styled.form`
  padding: 1.5rem;
  border: 1px solid gray;
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

const EnrollForm = () => {
  const list = useSelector((state: RootState) => state.counter.list);
  const groupList = useSelector((state: RootState) => state.counter.groupList);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [group, setGroup] = useState("");
  const [memo, setMemo] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setGroup(groupList[0]);
  }, [groupList]);

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
    const newList = [...list, obj];
    dispatch(setList(newList));
    localStorage.setItem("list", JSON.stringify(newList));
    setName("");
    setPhone("");
    setGroup(groupList[0]);
    setMemo("");
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

export default EnrollForm;
