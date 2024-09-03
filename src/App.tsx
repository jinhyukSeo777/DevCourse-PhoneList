import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EnrollForm from "./components/EnrollForm";
import ShowList from "./components/ShowList";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Modal from "./components/Modal";
import AddGruop from "./components/AddGruop";

const Conatiner = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  display: flex;
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
  const [list, setList] = useState<IList[]>([]);
  const [groupList, setGroupList] = useState<string[]>([
    "가족",
    "친구",
    "직장",
    "스터디",
  ]);
  const modalShow = useSelector((state: RootState) => state.counter.showModal);

  useEffect(() => {
    const itemString = localStorage.getItem("list");
    if (itemString) {
      const item = JSON.parse(itemString);
      setList(item);
    }
    const groupString = localStorage.getItem("group");
    if (groupString) {
      const item = JSON.parse(groupString);
      setGroupList(item);
    }
  }, []);

  return (
    <Conatiner>
      <h1>연락처 리스트</h1>
      <Wrap>
        <EnrollForm
          list={list}
          setList={setList}
          groupList={groupList}
          setGroupList={setGroupList}
        ></EnrollForm>
        <ShowList
          list={list}
          setList={setList}
          groupList={groupList}
          setGroupList={setGroupList}
        ></ShowList>
      </Wrap>
      {modalShow && (
        <Modal>
          <AddGruop
            groupList={groupList}
            setGroupList={setGroupList}
          ></AddGruop>
        </Modal>
      )}
    </Conatiner>
  );
}

export default App;
