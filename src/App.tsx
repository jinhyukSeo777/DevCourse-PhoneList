import React, { useEffect } from "react";
import styled from "styled-components";
import EnrollForm from "./components/EnrollForm";
import ShowList from "./components/ShowList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import Modal from "./components/Modal";
import AddGruop from "./components/AddGruop";
import { setGroupList, setList } from "./counterSlice";

const Conatiner = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 50px;
  @media (max-width: 1250px) {
    flex-direction: column;
  }
`;

export interface IList {
  name: string;
  phone: string;
  group: string;
  memo: string;
}

function App() {
  const modalShow = useSelector((state: RootState) => state.counter.showModal);
  const dispatch = useDispatch();

  useEffect(() => {
    const itemString = localStorage.getItem("list");
    if (itemString) {
      const item = JSON.parse(itemString);
      dispatch(setList(item));
    }
    const groupString = localStorage.getItem("group");
    if (groupString) {
      const item = JSON.parse(groupString);
      dispatch(setGroupList(item));
    }
  }, []);

  return (
    <Conatiner>
      <h1>연락처 리스트</h1>
      <Wrap>
        <EnrollForm></EnrollForm>
        <ShowList></ShowList>
      </Wrap>
      {modalShow && (
        <Modal>
          <AddGruop></AddGruop>
        </Modal>
      )}
    </Conatiner>
  );
}

export default App;
