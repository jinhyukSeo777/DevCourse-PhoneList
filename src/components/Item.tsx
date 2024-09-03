import styled from "styled-components";
import { IList } from "../App";
import { useState } from "react";
import Modal from "./Modal";
import Detail from "./Detail";

const Container = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
  padding: 2rem 0;
`;

const Info = styled.div`
  span {
    margin: 1rem;
  }
`;

const Btns = styled.div`
  button {
    padding: 0.5rem;
    cursor: pointer;
  }
`;

interface IProps {
  index: number;
  content: IList;
  deleteList: (index: number) => void;
  list: IList[];
  setList: React.Dispatch<React.SetStateAction<IList[]>>;
  groupList: string[];
  setGroupList: React.Dispatch<React.SetStateAction<string[]>>;
}

const Item = ({
  index,
  content,
  deleteList,
  list,
  setList,
  groupList,
  setGroupList,
}: IProps) => {
  const [modalShow, setModalShow] = useState(false);
  const modalOpen = () => {
    setModalShow(true);
  };
  const modalClose = () => {
    setModalShow(false);
  };

  return (
    <>
      <Container>
        <Info>
          <span>{content.name}</span>
          <span>{content.phone}</span>
          <span>{content.group}</span>
        </Info>
        <Btns>
          <button onClick={modalOpen}>세부사항</button>
          <button onClick={() => deleteList(index)}>삭제</button>
        </Btns>
      </Container>
      {modalShow && (
        <Modal>
          <Detail
            modalClose={modalClose}
            index={index}
            content={content}
            list={list}
            setList={setList}
            groupList={groupList}
            setGroupList={setGroupList}
          ></Detail>
        </Modal>
      )}
    </>
  );
};

export default Item;
