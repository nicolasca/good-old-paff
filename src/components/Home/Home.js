import styled from "styled-components";
import BackgroundOrcs from "../../assets/images/home/background-orcs.jpg";
import { ReactComponent as DropSVG } from "../../assets/images/home/blood.svg";

const HomeWrapper = styled.div`
  height: calc(100vh - 7rem);
  overflow: hidden;
`;

const PaffTitle = styled.h1`
  font-size: 10rem;
`;

const FirstSectionBis = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: height; */

  color: IndianRed;

  .title {
    font-weight: 900;
    font-size: 20vw;
    margin: 0;
    filter: url(#goo);
    position: relative;
    text-transform: uppercase;
  }

  .drop {
    width: 0.1em;
    height: 0.1em;
    border-radius: 0 100% 100% 100%;
    background-color: currentColor;
    position: absolute;
    top: 72%;
    animation: drop 3s infinite both;

    &:nth-child(1) {
      left: 3%;
    }

    &:nth-child(2) {
      left: 31%;
      animation-delay: -0.4s;
    }

    &:nth-child(3) {
      left: 55%;
      animation-delay: -1.5s;
    }

    &:nth-child(4) {
      left: 82%;
      animation-delay: -0.8s;
    }
  }

  @keyframes drop {
    0% {
      transform: translateY(0) scaleX(0.85) rotate(45deg);
      animation-timing-function: ease-out;
    }
    60% {
      transform: translateY(78%) scaleX(0.85) rotate(45deg);
      animation-timing-function: ease-in;
    }
    80%,
    100% {
      transform: translateY(60vh) scaleX(0.85) rotate(45deg);
    }
  }
`;

const FirstSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(50vh - 4rem);

  position: relative;

  ${PaffTitle} {
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -75%);
  }

  ${PaffTitle}:nth-child(1) {
    color: transparent;
    -webkit-text-stroke: 2px #03a9f4;
  }

  ${PaffTitle}:nth-child(2) {
    color: #03a9f4;
    animation: animate 4s ease-in-out infinite;
  }

  @keyframes animate {
    0%,
    100% {
      clip-path: polygon(
        0% 45%,
        16% 44%,
        33% 50%,
        54% 60%,
        70% 61%,
        84% 59%,
        100% 52%,
        100% 100%,
        0% 100%
      );
    }

    50% {
      clip-path: polygon(
        0% 60%,
        15% 65%,
        34% 66%,
        51% 62%,
        67% 50%,
        84% 45%,
        100% 46%,
        100% 100%,
        0% 100%
      );
    }
  }
`;

const BackgroundSection = styled.div`
  isolation: isolate;
  height: 100vh;
  width: 100vw;
  background-image: url(${BackgroundOrcs});
  background-size: cover;
  margin: 0rem -2rem 0rem -2rem;
`;

export default function Home() {
  return (
    <HomeWrapper>
      {/* <FirstSection>
        <PaffTitle>PAFF</PaffTitle>
        <PaffTitle>PAFF</PaffTitle>
      </FirstSection> */}
      <FirstSectionBis>
        <DropSVG />
        <h1 className="title">
          PAFF<span className="drop"></span>
          <span className="drop"></span>
          <span className="drop"></span>
          <span className="drop"></span>
        </h1>
      </FirstSectionBis>
      {/* <BackgroundSection /> */}
    </HomeWrapper>
  );
}
