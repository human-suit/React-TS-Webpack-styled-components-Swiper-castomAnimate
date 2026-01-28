import React, { useState, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  TimelineCircle,
  TimelinePoints,
  SimpleSlider,
  SimpleSliderRef,
} from "../widgets/timeline/ui";
import { steps } from "../widgets/timeline/data/steps";

const GlobalStyle = createGlobalStyle`
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body, #root {
    width:100%;
    height:100%;
    font-family:"PT Sans", sans-serif;
    background: #E5E5E5;
  }
`;

const Container = styled.div`
  padding-top: 10vh;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(66, 86, 122, 0.2);
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 400px) {
    max-width: none;
    padding: 10vh 16px 0;
    overflow: hidden;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 78px;
  color: #42567a;
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 40px;

  h1 {
    line-height: 1.2;
  }

  .title-main,
  .title-sub {
    display: block;
  }

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding-bottom: 30px;

    h1 {
      text-align: left;
    }

    .title-main,
    .title-sub {
      font-size: 32px;
      position: static;
    }
  }
`;

const Liner = styled.div`
  width: 5px;
  height: 15vh;
  background: linear-gradient(to bottom, #3877ee 0%, #ef5da8 100%);
  border-radius: 999px;

  @media (max-width: 400px) {
    display: none;
  }
`;

const Section = styled.div`
  margin-top: -120px;
  display: flex;
  justify-content: center;
  position: relative;

  @media (max-width: 400px) {
    margin-top: 0;
    padding: 0 16px;
  }
`;

const CircleWrapper = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  @media (max-width: 400px) {
    width: 280px;
    height: 230px;
    margin: 0 auto;
  }
`;

const StepCounter = styled.div`
  font-size: 16px;
  color: #42567a;
  font-weight: bold;
  margin: 20px 0px -10px 65px;
  order: 4;

  @media (max-width: 400px) {
    font-size: 18px;
    margin: 16px 0 -4px;
    order: 5;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 20px 0px 20px 60px;
  order: 5;

  @media (max-width: 400px) {
    margin: 16px 0;
    gap: 10px;
    order: 6;
  }
`;

const SliderFade = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  order: 6;

  @media (max-width: 400px) {
    order: 4;
  }
`;

const ArrowButton = styled.button<{ $left?: boolean; $disabled?: boolean }>`
  background: #e5e5e5;
  width: 50px;
  height: 50px;
  border: 1px solid #42567a;
  border-radius: 50%;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  svg {
    width: 30px;
    height: 30px;
    fill: #42567a;
    transform: ${({ $left }) => ($left ? "rotate(180deg)" : "none")};
  }
  @media (max-width: 400px) {
    width: 40px;
    height: 40px;
  }
`;

const VerticalLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background-color: rgba(66, 86, 122, 0.2);
  transform: translateX(-50%);

  @media (max-width: 400px) {
    display: none;
  }
`;

const HorizontalLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 43.3%;
  height: 1px;
  background-color: rgba(66, 86, 122, 0.2);

  @media (max-width: 400px) {
    display: none;
  }
`;

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState<number | null>(0);
  const [sliderVisible, setSliderVisible] = useState(true);
  const sliderRef = useRef<SimpleSliderRef>(null);
  const fadeTimeout = useRef<NodeJS.Timeout | null>(null);

  const changeStep = (nextStep: number) => {
    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);

    setSliderVisible(false);
    setTooltipVisible(null);

    fadeTimeout.current = setTimeout(() => {
      setCurrentStep(nextStep);
      sliderRef.current?.slideTo(0);
      setSliderVisible(true);
      setTimeout(() => setTooltipVisible(nextStep), 400);
      fadeTimeout.current = null;
    }, 300);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <VerticalLine />
        <HorizontalLine />

        <Header>
          <Liner />
          <h1>
            <span className="title-main">Исторические</span>
            <span className="title-sub">даты</span>
          </h1>
        </Header>

        <Section>
          <CircleWrapper size={500}>
            <TimelineCircle
              size={500}
              color="#42567A"
              values={steps[currentStep].years}
            />
            <TimelinePoints
              steps={steps}
              circleSize={500}
              activeIndex={currentStep}
              tooltipVisible={tooltipVisible}
              setTooltipVisible={setTooltipVisible}
              onPointClick={changeStep}
            />
          </CircleWrapper>
        </Section>

        <StepCounter>
          {String(currentStep + 1).padStart(2, "0")}/
          {String(steps.length).padStart(2, "0")}
        </StepCounter>

        <SliderFade $visible={sliderVisible}>
          <SimpleSlider
            ref={sliderRef}
            slides={steps[currentStep].facts.map((f) => ({
              title: `${f.year}`,
              description: f.description,
            }))}
            currentStep={0}
            onSlideChange={() => {}}
          />
        </SliderFade>

        <Controls>
          <ArrowButton
            $left
            $disabled={currentStep === 0}
            onClick={() => {
              if (currentStep > 0) changeStep(currentStep - 1);
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </ArrowButton>

          <ArrowButton
            $disabled={currentStep === steps.length - 1}
            onClick={() => {
              if (currentStep < steps.length - 1) changeStep(currentStep + 1);
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </ArrowButton>
        </Controls>
      </Container>
    </>
  );
};

export default App;
