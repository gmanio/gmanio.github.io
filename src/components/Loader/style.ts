import styled, { keyframes } from "styled-components";

export const RoundAnimation = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  
  50% {
    transform: rotateZ(360deg);
  }
  
  100% {
    transform: rotateZ(0deg);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 500px;
  justify-content: center;
  align-items: center;
`;

export const HexagonWrapper = styled.div`
  display: flex;
  animation: 4s ${RoundAnimation} ease-in-out infinite;
`;

export const ChangeAnimation = keyframes`
  0% {
    border-radius: 0%/0%;
  }
  
  50% {
    border-radius: 100%/100%;
  }
  
  100% {
    border-radius: 0%/0%;
  }
}`;

export const Hexagon = styled.div`
  position: relative;
  display: flex;
  width: 100px;
  height: 58px;
  color: rgba(255, 255, 255, 0.3);
  font-size: 16px;
  background-color: transparent;
  border: 1px solid black;

  &:before, &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: inherit;
    border: 1px solid black;
  }

  &::before {
    transform: rotate(60deg);
  }

  &::after {
    transform: rotate(-60deg);
  }

  &, &:before, &:after {
    animation: 4s ${ChangeAnimation} ease-in-out infinite;
  }
`;