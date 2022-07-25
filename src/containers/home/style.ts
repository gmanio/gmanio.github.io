// import styled from "@emotion/styled";
// import Paper from "@material-ui/core/Paper";
// import Container from "@material-ui/core/Container";

import styled from '@emotion/styled';
import { Paper, Container } from '@mui/material';
import { glitch, blur } from '../../styles/keyframes';

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
  align-items: center;
  justify-content: center;
`;

export const BackgroundImageWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80%;
  animation: ${blur} 10s ease 1s infinite;
`;

export const DwarfImage = styled.img`
  display: inline-flex;
  width: 100%;
  height: auto;
`;

export const ImageDescription = styled.div`
  /* margin-top: 30px;
  margin-left: -30px; */
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  white-space: pre;
  /* height: 40px; */
  /* line-height: 50px; */
  /* font-size: 40px; */
  font-family: 'Caveat';
  animation: ${glitch} 3s steps(100) infinite;
  transition: all 3s ease-in-out;
`;
