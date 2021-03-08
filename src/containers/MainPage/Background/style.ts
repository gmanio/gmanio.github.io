import styled from "styled-components";
import BGImage from './images/bg.png';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const Logo = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  min-height: 500px;
  opacity: 0.1;
  background: url(${BGImage}) contain;
  /* background-size: contain; */
  /* background: #eee; */
`;