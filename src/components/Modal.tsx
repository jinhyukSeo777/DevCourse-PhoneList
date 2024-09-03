import { styled } from "styled-components";

const Overlay = styled.div<{ $active?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
`;

interface IProps {
  children?: React.ReactNode;
}

const Modal = ({ children }: IProps) => {
  return <Overlay>{children}</Overlay>;
};

export default Modal;
