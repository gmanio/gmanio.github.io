import type { NextPage } from "next";
import styled from "@emotion/styled";
import Container from "@material-ui/core/Container";


const Home: NextPage = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <BackgroundImageWrapper>
          <DwarfImage
            src="/bg_dwarf.png"
            alt="me"
            width="700"
            height="505"
          />
        </BackgroundImageWrapper>
      </ContentContainer>
    </PageContainer>
  );
};

const PageContainer = styled(Container)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled(Container)`
  padding: 0 !important;
  position: relative;
  overflow: hidden;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const BackgroundImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  min-height: 505px;
`;

const DwarfImage = styled.img``;

export default Home;
