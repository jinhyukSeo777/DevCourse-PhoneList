import styled from "styled-components";
import { IList } from "../App";
import { useState } from "react";
import { mainColor } from "../color";
import EditForm from "./EditForm";

const Container = styled.div`
  background-color: white;
  padding: 1rem 2rem;
  position: relative;
  border-radius: 5px;
`;

const Box = styled.div`
  margin-bottom: 2rem;
  span {
    &:first-child {
      margin-right: 1rem;
      font-weight: bold;
    }
  }
`;

export const Btns = styled.div`
  position: absolute;
  top: -4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
`;

export const Close = styled.div`
  color: white;
  background-color: tomato;
  width: 3.5rem;
  height: 2.5rem;
  border-radius: 5px;
  text-align: center;
  align-content: center;
  cursor: pointer;
`;

const Save = styled.div`
  color: white;
  width: 3.5rem;
  height: 2.5rem;
  border-radius: 5px;
  text-align: center;
  align-content: center;
  cursor: pointer;
  background-color: ${mainColor};
`;

interface IProps {
  modalClose: () => void;
  content: IList;
  index: number;
  list: IList[];
  setList: React.Dispatch<React.SetStateAction<IList[]>>;
  groupList: string[];
  setGroupList: React.Dispatch<React.SetStateAction<string[]>>;
}

const Detail = ({
  modalClose,
  content,
  index,
  list,
  setList,
  groupList,
  setGroupList,
}: IProps) => {
  const [editing, setEditing] = useState(false);

  const editClicked = () => {
    if (editing) {
    } else {
      setEditing(true);
    }
  };

  return (
    <Container>
      {!editing ? (
        <>
          <h2>연락처 상세 정보</h2>
          <Box>
            <span>이름:</span>
            <span>{content.name}</span>
          </Box>
          <Box>
            <span>전화번호:</span>
            <span>{content.phone}</span>
          </Box>
          <Box>
            <span>그룹:</span>
            <span>{content.group}</span>
          </Box>
          <Box>
            <span>메모:</span>
            <span>{content.memo}</span>
          </Box>
        </>
      ) : (
        <EditForm
          list={list}
          setList={setList}
          groupList={groupList}
          setGroupList={setGroupList}
          index={index}
          content={content}
          modalClose={modalClose}
        ></EditForm>
      )}
      <Btns>
        <Close onClick={modalClose}>닫기</Close>
        {!editing && <Save onClick={editClicked}>수정</Save>}
      </Btns>
    </Container>
  );
};

export default Detail;
