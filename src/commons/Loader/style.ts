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
  user-select: none;
`;

export const LoaderWrapper = styled.div`
  display: inline-flex;
  min-width: 200px;
  min-height: 200px;
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
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.1);

  &:before, &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: inherit;
    border: inherit;
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

export const CenterText = styled.div`
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;