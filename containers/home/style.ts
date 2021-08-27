import styled from "@emotion/styled";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

export const BasePage = styled(Paper)`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const PageContainer = styled(Container)`
  padding: 0 !important;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ContentContainer = styled(Container)`
  padding: 0 !important;
  position: relative;
  overflow: hidden;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const BackgroundImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  min-height: 505px;
`;

export const DwarfImage = styled.img`
  display: inline-flex;
  width: 100%;
  height: auto;
`;
