import styled from "styled-components";
import CustomButton from "../UI/CustomButton";
import HistoryBox from "../UI/HistoryBox";
import Modal from "./Modal";
import { authService } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import AA from "../test.json";

export interface DataType {
  id: number;
  title: string;
  source_text: string[];
  source: string;
  text: string;
  item: string | number;
}

interface ItemType {
  title?: string;
  source_text?: string[];
  source?: string;
  text?: string;
  id?: number;
  Fade?: React.FC<typeof Fade>;
}

export const HistoryInfo = (props: ItemType) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isTopButtonShow, setIsTopButtonShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const openModal = () => {
    if (authService.currentUser) {
      navigate("/test");
    }
    if (!authService.currentUser) {
      setModalOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  // 스크롤을 위로 올려주는 버튼 함수입니다
  const ScrollTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleTopButtonShow = () => {
      if (window.scrollY > 30) {
        setIsTopButtonShow(true);
      } else {
        setIsTopButtonShow(false);
      }
    };

    window.addEventListener("scroll", handleTopButtonShow);
    return () => {
      window.removeEventListener("scroll", handleTopButtonShow);
    };
  }, []);
  const datas = AA.description;
  // console.log(datas);

  return (
    <>
      {modalOpen && <Modal setModalOpen={setModalOpen} />}

      {datas.map((item) => {
        return (
          <HistoryBox key={item.id}>
            <HistoryCardSection>
              <div>{item.title}</div>
              <div>{item.text}</div>
              <div>{item.source}</div>
            </HistoryCardSection>
          </HistoryBox>
        );
      })}

      <ButtonBox>
        <CustomButton onClick={openModal}>테스트 하러가기</CustomButton>
      </ButtonBox>
      <ScrollTopButtonContainer>
        {isTopButtonShow ? (
          <ScrollTopButton onClick={ScrollTop}>TOP</ScrollTopButton>
        ) : null}
      </ScrollTopButtonContainer>
    </>
  );
};

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  z-index: 0;
`;

const ImageContainer = styled.div`
  position: absolute;
  left: 100px;
  top: 600px;
  width: 100px;
  height: 100px;
  z-index: 10;
  /* animation: 10s opacity 1s forwards; */
  /* transform: translate(50px, 660px); */
`;

const ScrollTopButtonContainer = styled.div`
  position: fixed;
  bottom: 5%;
  right: 3%;
`;

const ScrollTopButton = styled(CustomButton)`
  border: none;
  background-color: #fff;
  color: #000;
  font-weight: bold;
`;

const HistoryCardSection = styled.div`
  width: 80%;
  height: 80%;
  background-color: #fff;
  padding: 5rem;
`;

export default HistoryInfo;
