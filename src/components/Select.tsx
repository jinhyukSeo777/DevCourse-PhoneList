import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { toggleModal } from "../counterSlice";

const SelectBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  div {
    display: flex;
    justify-content: space-between;
  }
  select {
    width: 91px;
    padding: 6px 16px 6px 6px;
    outline: none;
  }
  button {
    padding: 5px 1rem;
    margin-left: 10px;
    outline: none;
    cursor: pointer;
  }
`;

interface IProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  groupList: string[];
  setGroupList: React.Dispatch<React.SetStateAction<string[]>>;
  id?: string;
}

const Select = ({ groupList, setGroupList, setState, id }: IProps) => {
  const dispatch = useDispatch();
  const modalOpen = () => {
    dispatch(toggleModal());
  };

  const onchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    modalOpen();
  };

  return (
    <>
      <SelectBox>
        <label htmlFor="group">그룹</label>
        <div>
          <select value={id} id="group" onChange={onchange}>
            {groupList.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button onClick={onClick}>조직추가</button>
        </div>
      </SelectBox>
    </>
  );
};

export default Select;
