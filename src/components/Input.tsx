import { useState } from "react";
import { styled } from "styled-components";
import { IList } from "../App";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  input {
    width: 170px;
    padding: 8px;
    margin-left: 3rem;
    outline: none;
  }
`;

const Error = styled.span`
  color: #e24242;
  margin-bottom: 0.5rem;
`;

interface IProps {
  content: string;
  id: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  list: IList[];
}

const Input = ({ content, id, state, setState, setIsValid, list }: IProps) => {
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setState(value);
    setError("");
    setIsValid(true);
    const nameRegex = /^[가-힣]{2,}$/;
    const phoneRegex = /^010-\d{3,4}-\d{4}$/;

    if (e.target.id === "name") {
      if (!nameRegex.test(value)) {
        setError("이름은 한글로 두 글자 이상 입력해주세요.");
        setIsValid(false);
      }
      if (list.some((v) => v.name === value)) {
        setError("이미 동일 이름이 있습니다.");
      }
    } else if (e.target.id === "phone") {
      if (!phoneRegex.test(value)) {
        setError("전화번호는 010-0000-0000 형식으로 입력해주세요.");
        setIsValid(false);
      }
    }
  };

  return (
    <Container>
      <InputBox>
        <label htmlFor={id}>{content}</label>
        <input
          placeholder={content}
          id={id}
          type="text"
          onChange={onChange}
          value={state}
        ></input>
      </InputBox>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Input;
